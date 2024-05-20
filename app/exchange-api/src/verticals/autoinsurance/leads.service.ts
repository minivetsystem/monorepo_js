import { maxBy, filter } from "lodash";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import {
  Bid,
  BidDocument,
  LeadType,
  LeadTypeDocument,
  IncomingRequest,
  IncomingRequestDocument,
  OutgoingRequest,
  OutgoingRequestDocument,
  ClientReturn,
  ClientReturnDocument,
  BlacklistEmail,
  BlacklistEmailDocument,
  BlacklistPhone,
  BlacklistPhoneDocument,
  BlacklistJornayaId,
  BlacklistJornayaIdDocument,
  Zipcode,
  ZipcodeDocument,
  Lead,
  LeadDocument,
  VendorSubIDDocument,
  VendorSubID,
  Ping,
  PingDocument,
  Post,
  PostDocument,
  ClientSentReturn,
  ClientSentReturnDocument
} from "./schemas";
import {
  Campaign,
  CampaignDocument
} from "../../campaigns/schemas";
import {
  PingDto,
  PingValidationDto,
  PostDto,
  RegenerateClientReturnsEmailDto,
  RevenueShareOnPingDto,
  SendClientReturnsEmailDto,
  SendClientReturnsEmailResponseDto
} from "./dto";
import { ConfigService } from "@nestjs/config";
import {
  REQUEST_STATES,
  REQUEST_TYPE,
  RESPONSE_TYPE,
  VALIDATION_MESSAGES,
  CLIENT_HANDLERS,
  LEAD_FLOW_STATUSES,
  USER_ACCOUNT_STATUS,
  CLIENT_RESPONSE_TYPES,
  CST_TIMEZONE
} from "../../config/constants";
import { Connection, Model, Schema, Types } from "mongoose";
import { encrypt, sendEmail } from "../../helpers";
import { User, UserDocument, VendorLeadTypeSetting, VendorLeadTypeSettingDocument } from "../../users/schemas";
import { Astoria, IradiusMarketing } from "../../clients";
import { ClientReturnsFileDto } from "./dto/clientreturnsfile.dto";
import { ReturnsFileValidationDto } from "./dto/returnsfilevalidation.dto";
import moment from "moment";
import { ReturnsFileResultDto } from "./dto/returnsfileresult.dto";
import { VendorService } from "./vendor.service";
import isInt from 'validator/lib/isInt';
import * as path from 'path';
import { createObjectCsvWriter } from 'csv-writer';
import { SettingsService } from "../../settings/settings.service";
import fs from 'fs';

/**
 * This is the main lead service which handles all the ping/post/bid requests.
 */
@Injectable()
export class LeadsService {
  /**
   * Constructor for the lead service.
   * @param connection Connection for mongoose to mongodb.
   * @param incomingRequestModel  This represents the request model.
   * @param vendorModel This represents the vendor model.
   * @param leadModel This represents the lead model.
   * @param clientModel This represents the client model.
   * @param campaignFieldRuleModel This represents the campaign field rule
   * model.
   * @param campaignFieldModel  This represents the campaign field model.
   * @param leadTypeModel  This represents the lead type model.
   * @param requestFieldModel This represents the request field model.
   * @param bidModel This represents the bid model.
   * @param campaignModel This represents the campaign model.
   * @param ruleModel This represents the campaign model.
   * @param configService This represents the config service instance.
   * @param activityLogsService This represents the activity log service
   * instance.
   * @param validationService This represents the validation service instance.
   */
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectModel(IncomingRequest.name)
    private incomingRequestModel: Model<IncomingRequestDocument>,
    @InjectModel(Ping.name)
    private pingModel: Model<PingDocument>,
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
    @InjectModel(OutgoingRequest.name)
    private outgoingRequestModel: Model<OutgoingRequestDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(LeadType.name)
    private leadTypeModel: Model<LeadTypeDocument>,
    @InjectModel(Bid.name)
    private bidModel: Model<BidDocument>,
    @InjectModel(BlacklistEmail.name)
    private blacklistEmailsModel: Model<BlacklistEmailDocument>,
    @InjectModel(BlacklistPhone.name)
    private blacklistPhonesModel: Model<BlacklistPhoneDocument>,
    @InjectModel(BlacklistJornayaId.name)
    private blacklistJornayaIdsModel: Model<BlacklistJornayaIdDocument>,
    @InjectModel(Zipcode.name)
    private zipCodeModel: Model<ZipcodeDocument>,
    @InjectModel(VendorLeadTypeSetting.name)
    private vendorLeadTypeSettingModel: Model<VendorLeadTypeSettingDocument>,
    @InjectModel(Campaign.name)
    private campaignModel: Model<CampaignDocument>,
    @InjectModel(Lead.name)
    private leadModel: Model<LeadDocument>,
    @InjectModel(VendorSubID.name)
    private vendorSubIDModel: Model<VendorSubIDDocument>,
    @InjectModel(ClientReturn.name)
    private clientReturnsModel: Model<ClientReturnDocument>,
    @InjectModel(ClientSentReturn.name)
    private clientSentReturnsModel: Model<ClientSentReturnDocument>,
    private configService: ConfigService,
    private vendorService: VendorService,
    private settingsService: SettingsService
  ) { }

  /**
   * This api is used to fetch all the new post requests.
   */
  async fetchNewPosts(): Promise<IncomingRequest[]> {
    const allPosts = await this.incomingRequestModel
      .find({
        $and: [{
          status: REQUEST_STATES.New, post_time: {
            $gte: new Date(Date.now() - 15000),
            $lt: Date.now()
          }
        }, { request_type: REQUEST_TYPE.Post }]
      }, null, { strictQuery: false })
      .populate({ path: 'lead_type', select: 'lead_type' })
      .populate({ path: 'vendor_id', select: ['first_name', 'last_name'] })
      .exec();

    if (!allPosts) {
      throw new BadRequestException('Failed to fetch new posts.');
    }

    return allPosts;
  }

  async postSelectedClient(request: any, post_id: Schema.Types.ObjectId, confirmation_id: string): Promise<any> {

    const bid = await this.bidModel.findOne({
      confirmation_code: request.confirmation_id
    }).exec();

    const campaign = await this.campaignModel
                                .findById(bid.campaign)
                                .populate({ path: 'client' })
                                .exec();

     if(campaign.client.user_status !== USER_ACCOUNT_STATUS.Inactive && campaign.client.lead_flow_status !== LEAD_FLOW_STATUSES.Paused) {
      if(campaign?.client_handler) {
        let clientHandler : any;
        switch(campaign.client_handler ) {
          case CLIENT_HANDLERS.IradiusMarketing:
              await this.outgoingRequestModel.create({
                _id: new Types.ObjectId(),
                ping_time: Date.now(),
                client: campaign.client._id,
                vendor: request.vendor_id,
                incoming_request: post_id,
                request_type: REQUEST_TYPE.Post,
                lead_mode: request.lead_mode,
                lead_type: request.lead_type._id
              });
            clientHandler = new IradiusMarketing(this, this.configService);
          break;
          case CLIENT_HANDLERS.Astoria:
              await this.outgoingRequestModel.create({
                _id: new Types.ObjectId(),
                ping_time: Date.now(),
                client: campaign.client._id,
                vendor: request.vendor_id,
                incoming_request: post_id,
                request_type: REQUEST_TYPE.Post,
                lead_mode: request.lead_mode,
                lead_type: request.lead_type._id
              });
            clientHandler = new Astoria(this, this.configService);
          break;
          default:
          throw new BadRequestException('No client handler found.');
        }


        const lead = await clientHandler.execute(request, bid, campaign);

        let savedLead = null;
        if(lead.status === RESPONSE_TYPE.Accepted) {
          savedLead = await this.saveLead(request, bid, lead, post_id);
          }
          await this.incomingRequestModel.findByIdAndUpdate(post_id, { $set: {
            post_client_response_payload: lead.client_response_payload,
            post_response_payload: JSON.stringify({
              response: lead.status,
              confirmation: confirmation_id,
              price: Number(bid.vendor_price.toFixed(2))
            })
          } }).exec();

          return {
            lead_id: savedLead?._id,
            response: lead.status,
            confirmation: confirmation_id,
            price: Number(bid.vendor_price.toFixed(2))
          };
      } else {
        throw new BadRequestException('No client handler found.');
      }
    } else {
      throw new BadRequestException(VALIDATION_MESSAGES.client_not_active);
    }
  }

  async pingAllClients(request: any, ping_id: Schema.Types.ObjectId, lead_type_id: Schema.Types.ObjectId): Promise<PingValidationDto> {

    const validation = new PingValidationDto([]);

    const allCampaigns = await this.campaignModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'client',
          foreignField: '_id',
          as: 'client'
        }
      },
      {
        $unwind: {
          path: "$client",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'clientleadtypecaps',
          localField: 'client._id',
          foreignField: 'client',
          as: 'client.per_min_ping_caps'
        }
      },
      {
        $lookup: {
          from: 'leadtypes',
          localField: 'lead_type',
          foreignField: '_id',
          as: 'lead_type'
        }
      },
      {
        $unwind: {
          path: "$lead_type",
          preserveNullAndEmptyArrays: true
        }
      },
      { $match: { 'lead_type.lead_type_id': request.lead_type } },
      { $match: { 'vendors': { $exists: new Types.ObjectId(request.vendor_id) } } },
    ]);

    await Promise.all(allCampaigns.map(async (campaign) => {
      if(campaign.client.user_status !== USER_ACCOUNT_STATUS.Inactive && campaign.client.lead_flow_status !== LEAD_FLOW_STATUSES.Paused) {
      
        if(campaign?.client_handler) {
          const subIdExists = await this.vendorSubIDModel.findOne({
            vendor: new Types.ObjectId(request.vendor_id),
            sub_id: request.sub_id,
            campaign: { $regex: campaign._id  }
          }).exec();

          if(!subIdExists || (!subIdExists?.is_blocked)) {
            let clientHandler : any;
            switch(campaign.client_handler ) {
              case CLIENT_HANDLERS.IradiusMarketing:
                    clientHandler = new IradiusMarketing(this, this.configService);
              break;
              case CLIENT_HANDLERS.Astoria:
                    clientHandler = new Astoria(this, this.configService);
              break;
              default:
              await this.savePing(request, CLIENT_RESPONSE_TYPES.CLIENT_VALIDATION_FAILED, campaign.client);
              throw new BadRequestException('No client handler found.');
            }
      
            const outgoing_requests = await this.outgoingRequestModel.find({
              client: campaign.client._id,
              ping_time: { 
                $gte: new Date().getTime() - (60 * 1000), $lte: new Date(new Date())
              }
            }).exec();
    
            const client_cap = filter(campaign.client.per_min_ping_caps, { lead_type: lead_type_id })[0];

            if(clientHandler && outgoing_requests.length < client_cap.per_min_ping_cap) {
    
              await this.outgoingRequestModel.create({
                _id: new Types.ObjectId(),
                ping_time: Date.now(),
                client: campaign.client._id,
                vendor: request.vendor_id,
                incoming_request: ping_id,
                request_type: REQUEST_TYPE.Ping,
                lead_mode: request.lead_mode,
                lead_type: lead_type_id
              });
              const bid = await clientHandler.execute(request, null, campaign);
    
              bid.request = ping_id;
              bid.campaign = campaign;
      
              const revenueShareDetails = await this.performRevenueCalc(bid);
      
              const finalBidData = {
                ...bid,
                ...revenueShareDetails,
                vendor_price: Number(revenueShareDetails.vendor_share.toFixed(2))
              };
      
              await this.bidModel.create({
                _id: new Types.ObjectId(),
                ...finalBidData,
                confirmation_code: '',
                lead_mode: request.lead_mode,
                lead_type: lead_type_id,
                added_on: Date.now()
              });
        
              await this.outgoingRequestModel.updateOne({ client: campaign.client._id, incoming_request: ping_id}, { $set: { status: REQUEST_STATES.Bidded } }).exec();
            } else {
              validation.errors.push(VALIDATION_MESSAGES.client_per_min_ping_cap_reached);
              await this.savePing(request, CLIENT_RESPONSE_TYPES.CLIENT_VALIDATION_FAILED, campaign.client);
              return validation;
            }          
          }
      } else {
        validation.errors.push(VALIDATION_MESSAGES.no_client_handler_found);
        await this.savePing(request, CLIENT_RESPONSE_TYPES.CLIENT_VALIDATION_FAILED, campaign.client);
        return validation;
      }
    } else {
      validation.errors.push(VALIDATION_MESSAGES.client_not_active);
      await this.savePing(request, CLIENT_RESPONSE_TYPES.CLIENT_VALIDATION_FAILED, campaign.client);
      return validation;
    }
    }));
    return validation;
  }

   /**
   * This api is used to fetch all the bids for the ping request.
   */
  async fetchAllBidsForRequest(ping_id: string): Promise<Bid[]> {
    const allBids = await this.bidModel
      .find({ request: ping_id })
      .populate({ path: 'client' })
      .exec();

    if (!allBids) {
      throw new BadRequestException('Failed to fetch all bids.');
    }

    return allBids;
  }

  /**
   * This function is used to check if the vendor has exceeded the max. no. of ping allowed per minute and day.
   * @param vendor_id 
   * @param lead_type_id 
   * @returns Boolean value
   */
  async validateVendorForLeadFlowStatus(vendor_id: string, lead_type_id: number): Promise<boolean> {

    const vendor = await this.userModel.findById(vendor_id).populate({ path: 'lead_type_settings', populate: { path: 'lead_type' } }).exec();

    if (!vendor || (vendor && vendor.user_status === USER_ACCOUNT_STATUS.Inactive)) {
      return false
    }

    const lead_type = await this.leadTypeModel.find({ lead_type_id }).exec();

    const pingsPerMinute = await this.incomingRequestModel.find({
      vendor_id: new Types.ObjectId(vendor_id),
      lead_mode: 1,
      lead_type: lead_type,
      ping_time: {
        $gt: new Date().getTime() - (1 * 60 * 1000)
      }
    }).exec();

    //To-Do Don't pick first element 
    const leadTypeSetting = vendor.lead_type_settings[0];

    if (leadTypeSetting.max_pings_per_min_cap < pingsPerMinute.length && leadTypeSetting.lead_flow_status === LEAD_FLOW_STATUSES.Running) {
      await this.vendorLeadTypeSettingModel.findByIdAndUpdate(leadTypeSetting._id, { $set: { lead_flow_status: LEAD_FLOW_STATUSES.Paused } }).exec();
      await this.userModel.findByIdAndUpdate(vendor_id, { $set: { lead_flow_status: LEAD_FLOW_STATUSES.Paused } }).exec();
      return false;
    } else if (leadTypeSetting.max_pings_per_min_cap > pingsPerMinute.length && leadTypeSetting.lead_flow_status === LEAD_FLOW_STATUSES.Paused) {
        await this.vendorLeadTypeSettingModel.findByIdAndUpdate(leadTypeSetting._id, { $set: { lead_flow_status: LEAD_FLOW_STATUSES.Running } }).exec();
        await this.userModel.findByIdAndUpdate(vendor_id, { $set: { lead_flow_status: LEAD_FLOW_STATUSES.Running } }).exec();
      return true;
    }

    return true;
  }

  /**
   * This api is used to fetch all the new ping requests.
   */
  async fetchNewPings(): Promise<IncomingRequest[]> {
    const allPings = await this.incomingRequestModel
      .find({ status: REQUEST_STATES.New, request_type: REQUEST_TYPE.Ping })
      .populate({ path: 'lead_type', select: 'lead_type' })
      .populate({ path: 'vendor_id', select: ['first_name', 'last_name'] })
      .exec();

    if (!allPings) {
      throw new BadRequestException('Failed to fetch new pings.');
    }

    return allPings;
  }

  /**
   * This function is used to fetch the highest bid for the ping request.
   * @param requestId This represents the ping_id.
   * @returns Promise Bid
   */
  async fetchHighestBid(requestId: Schema.Types.ObjectId): Promise<Bid> {
      const allBids = await this.bidModel
        .find({ request: requestId, client_status: RESPONSE_TYPE.Accepted })
        .populate({ path: 'client', populate: { path: 'campaign' } })
        .exec();

      if (allBids.length > 0) {
        return maxBy(allBids, (bid) => {
          return bid.client_price;
        });
      }
  }

  async performRevenueCalc(bidResult: Bid): Promise<RevenueShareOnPingDto> {

    const revenueShare = new RevenueShareOnPingDto();

    if(bidResult.client && !isNaN(bidResult.client_price)) {

      const pingRequest = await this.incomingRequestModel
      .findById(bidResult.request._id)
      .populate({ path: 'vendor_id', populate: { path: 'lead_type_settings' } })
      .exec();

    const vendorLeadTypeSettings = filter(pingRequest.vendor_id.lead_type_settings, { lead_type: pingRequest.lead_type._id })[0];

    if (vendorLeadTypeSettings.payment_model === 'rev_share') {
      const revenueSharePercent = vendorLeadTypeSettings.rev_share;
      let vendorShare = bidResult.client_price / 100 * revenueSharePercent;
      if (vendorShare > vendorLeadTypeSettings.vendor_max_payout_cap) {
        vendorShare = vendorLeadTypeSettings.vendor_max_payout_cap;
      } else if(vendorShare < vendorLeadTypeSettings.vendor_min_payout_cap) {
        vendorShare = vendorShare - vendorLeadTypeSettings.vendor_min_payout_cap;
      }
      revenueShare.vendor_share = Number(vendorShare.toFixed(2));
      revenueShare.revenue_share = Number((bidResult.client_price - revenueShare.vendor_share).toFixed(2));
    } else {
      let revenueShareFixed = vendorLeadTypeSettings.rev_share;
      const minimumProfitPercnet = vendorLeadTypeSettings.min_profit_percent || 0;
      if(minimumProfitPercnet > 0) {
        const profitAmount = bidResult.client_price / 100 * minimumProfitPercnet;
        revenueShareFixed += profitAmount;
      }
      let vendorShare = revenueShareFixed;
      let revenueShareVal = bidResult.client_price - revenueShareFixed;
      if (bidResult.client_price < revenueShareFixed) {
        vendorShare = bidResult.client_price - vendorLeadTypeSettings.rev_share;
        revenueShareVal = bidResult.client_price - vendorShare;
      } else {
        vendorShare = vendorLeadTypeSettings.rev_share;
        revenueShareVal = bidResult.client_price - vendorShare;
      }
      revenueShare.vendor_share = Number(vendorShare.toFixed(2));
      revenueShare.revenue_share = Number(revenueShareVal.toFixed(2));
    }

    }

    return revenueShare;
  }

  async savePost(postRequest: IncomingRequest, reason: CLIENT_RESPONSE_TYPES, lead_id?: Schema.Types.ObjectId): Promise<void> {
    const start_time = moment(postRequest.post_time).subtract(1, 'minute').startOf('minute');
    const end_time = moment(postRequest.post_time).endOf('minute');

    const leads = await this.incomingRequestModel.aggregate([
      {
        $match: {
          post_time: { $gte: start_time.toDate(), $lte: end_time.toDate() }
        }
      },
      {
        $lookup: {
          from: 'leads',
          localField: '_id',
          foreignField: 'request',
          as: 'lead'
        },
      },
      {
        $unwind: {
          path: '$lead',
          preserveNullAndEmptyArrays: true
        }
      },
      { 
        $group: {
        _id: null,
        total_time: { $sum: '$response_time' },
        max_time: { $max: '$response_time' },
        min_time: { $min: '$response_time' },
        total_client_price: { $sum: '$lead.client_price' },
        total_vendor_price: { $sum: '$lead.vendor_price' },
        total_revenue_share: { $sum: '$lead.revenue_share' },
        max_client_price: { $max: '$lead.client_price' },
        min_client_price: { $min: '$lead.client_price' },
      }},
      {
        $project: {
          _id: 0,
          total_time: { $round: ['$total_time', 2] },
          max_time: { $round: ['$max_time', 2] },
          min_time: { $round: ['$min_time', 2] },
          total_client_price: { $round: ['$total_client_price', 2] },
          total_vendor_price: { $round: ['$total_vendor_price', 2] },
          total_revenue_share: { $round: ['$total_revenue_share', 2] },
          max_client_price: { $round: ['$max_client_price', 2] },
          min_client_price: { $round: ['$min_client_price', 2] }
        }
      }
    ]);

    let actualReason = '';

    switch(reason) {
      case CLIENT_RESPONSE_TYPES.POST_SUCCESSFUL:
        actualReason = 'post_accepted';
        break;
      case CLIENT_RESPONSE_TYPES.POST_REJECTED:
        actualReason = 'post_rejected';
        break;
    }

    const pushData = {
      posts: postRequest._id
    };

    if(lead_id) {
      pushData['leads'] = lead_id;
    }

    await this.postModel.updateOne(
      { start_time, 
        end_time
      },
      {
         $push: pushData,
         $inc: { ["reasons."+ actualReason +".no_of_posts"]: 1 },
         $set: {
          ["reasons."+ actualReason +".min_client_price"]: leads?.length > 0 ? leads[0].max_client_price : 0,
          ["reasons."+ actualReason +".max_client_price"]: leads?.length > 0 ? leads[0].max_client_price : 0,
          ["reasons."+ actualReason +".total_client_price"]: leads?.length > 0 ? leads[0].total_client_price: 0,
          ["reasons."+ actualReason +".total_vendor_price"]: leads?.length > 0 ? leads[0].total_vendor_price: 0,
          ["reasons."+ actualReason +".total_revenue_share"]: leads?.length > 0 ? leads[0].total_revenue_share: 0,
          ["reasons."+ actualReason +".min_time"]: leads?.length > 0 ? leads[0].min_time : 0,
          ["reasons."+ actualReason +".max_time"]: leads?.length > 0 ? leads[0].max_time : 0,
          ["reasons."+ actualReason +".total_time"]: leads?.length > 0 ? leads[0].total_time : 0
         },
         $setOnInsert: {
            vendor_id: postRequest.vendor_id,
            lead_type: postRequest.lead_type.lead_type_id,
            lead_mode: postRequest.lead_mode,
            client_id: postRequest.client,
            campaign_id: postRequest.client.campaign
         }
      },
      { upsert: true  }
    )
  }

  async savePing(pingRequest: IncomingRequest, reason: CLIENT_RESPONSE_TYPES, client?: User, campaign?: Campaign): Promise<void> {

    const start_time = moment(pingRequest.post_time).subtract(1, 'minute').startOf('minute');
    const end_time = moment(pingRequest.post_time).endOf('minute');

    if(client) {
      const bids = await this.bidModel.aggregate([
        {
          $match: {
            client: client._id,
            client_rejection_reason: reason === CLIENT_RESPONSE_TYPES.PING_SUCCESSFUL ? '' : reason
          }
        },
        {
          $lookup: {
            from: 'incomingrequests',
            localField: 'request',
            foreignField: '_id',
            as: 'request'
          }
        },
        {
          $unwind: {
            path: '$request',
            preserveNullAndEmptyArrays: true
          }
        },
        { 
          $group: {
          _id: null,
          total_time: { $sum: '$request.response_time' },
          max_time: { $max: '$request.response_time' },
          min_time: { $min: '$request.response_time' },
          total_client_price: { $sum: '$client_price' },
          total_vendor_price: { $sum: '$vendor_price' },
          total_revenue_share: { $sum: '$revenue_share' },
          max_client_price: { $max: '$client_price' },
          min_client_price: { $min: '$client_price' },
        }},
        {
          $project: {
            _id: 0,
            total_time: { $round: ['$total_time', 2] },
            max_time: { $round: ['$max_time', 2] },
            min_time: { $round: ['$min_time', 2] },
            total_client_price: { $round: ['$total_client_price', 2] },
            total_vendor_price: { $round: ['$total_vendor_price', 2] },
            total_revenue_share: { $round: ['$total_revenue_share', 2] },
            max_client_price: { $round: ['$max_client_price', 2] },
            min_client_price: { $round: ['$min_client_price', 2] }
          }
        }
      ]);

      let actualReason = '';

      switch(reason.trim()) {
        case CLIENT_RESPONSE_TYPES.BEYOND_EXPECTED_SCHEDULE:
          actualReason = 'beyond_expected_schedule';
          break;
        case CLIENT_RESPONSE_TYPES.NO_BUYER_FOUND:
          actualReason = 'no_buyer_found';
          break;
        case CLIENT_RESPONSE_TYPES.INTERNAL_NO_BUYER_FOUND:
          actualReason = 'internal_no_buyer_found';
          break;
        case CLIENT_RESPONSE_TYPES.CLIENT_VALIDATION_FAILED:
          actualReason = 'client_validation_failed';
          break;
        case CLIENT_RESPONSE_TYPES.LEAD_CAP_EXHAUSTED:
          actualReason = 'lead_cap_exhausted';
          break;
        case CLIENT_RESPONSE_TYPES.VENDOR_ACCOUNT_DISABLED:
          actualReason = 'vendor_account_disabled';
          break;
        case CLIENT_RESPONSE_TYPES.PING_SUCCESSFUL:
          actualReason = 'ping_successful';
          break;
        default:
          actualReason = 'other_reason';
          break;
      }

      const pingExists = await this.pingModel.findOne({ start_time, end_time }).exec();

      if(!pingExists?._id) {
         await this.pingModel.create({
          _id: new Types.ObjectId(),
          vendor_id: pingRequest.vendor_id,
          lead_type: pingRequest.lead_type.lead_type_id,
          lead_mode: pingRequest.lead_mode,
          clients: [{
            client,
            campaign,
            pings: [ pingRequest._id ],
            reasons: {
              [actualReason]: {
                no_of_pings: 1,
                min_client_price: bids?.length > 0 ? bids[0].min_client_price : 0,
                max_client_price: bids?.length > 0 ? bids[0].max_client_price : 0,
                total_client_price: bids?.length > 0 ? bids[0].total_client_price: 0,
                total_vendor_price: bids?.length > 0 ? bids[0].total_vendor_price: 0,
                total_revenue_share: bids?.length > 0 ? bids[0].total_revenue_share: 0,
                min_time: bids?.length > 0 ? bids[0].min_time : 0,
                max_time: bids?.length > 0 ? bids[0].max_time : 0,
                total_time: bids?.length > 0 ? bids[0].total_time : 0
              }
            }
          }]
        });
      } else {
        if(filter(pingExists.clients, { client: client._id }).length > 0) {
           await this.pingModel.findByIdAndUpdate(pingExists._id, {
            clients: pingExists.clients.map((clnt) => {
              if(clnt.client._id === client._id && clnt.campaign._id === campaign._id) {
                clnt.pings.push(pingRequest);
                clnt[`reasons.${actualReason}.no_of_pings`] = clnt[`reasons.${actualReason}.no_of_pings`] + 1;
                clnt[`reasons.${actualReason}.min_client_price`] = bids?.length > 0 ? bids[0].min_client_price : 0;
                clnt[`reasons.${actualReason}.max_client_price`] = bids?.length > 0 ? bids[0].max_client_price : 0;
                clnt[`reasons.${actualReason}.total_client_price`] = bids?.length > 0 ? bids[0].total_client_price: 0;
                clnt[`reasons.${actualReason}.total_vendor_price`] = bids?.length > 0 ? bids[0].total_vendor_price: 0;
                clnt[`reasons.${actualReason}.total_revenue_share`] = bids?.length > 0 ? bids[0].total_revenue_share: 0;
                clnt[`reasons.${actualReason}.min_time`] = bids?.length > 0 ? bids[0].min_time : 0;
                clnt[`reasons.${actualReason}.max_time`] = bids?.length > 0 ? bids[0].max_time : 0;
                clnt[`reasons.${actualReason}.total_time`] = bids?.length > 0 ? bids[0].total_time : 0;
              };
              return clnt;
            })
          }).exec();
        } else {
          await this.pingModel.findByIdAndUpdate(pingExists._id, {
            clients: [
              ...pingExists.clients,
              {
                client,
                campaign,
                pings: [ pingRequest._id ],
                [`reasons.${actualReason}.no_of_pings`]: 1,
                [`reasons.${actualReason}.min_client_price`]: bids?.length > 0 ? bids[0].min_client_price : 0,
                [`reasons.${actualReason}.max_client_price`]: bids?.length > 0 ? bids[0].max_client_price : 0,
                [`reasons.${actualReason}.total_client_price`]: bids?.length > 0 ? bids[0].total_client_price: 0,
                [`reasons.${actualReason}.total_vendor_price`]: bids?.length > 0 ? bids[0].total_vendor_price: 0,
                [`reasons.${actualReason}.total_revenue_share`]: bids?.length > 0 ? bids[0].total_revenue_share: 0,
                [`reasons.${actualReason}.min_time`]: bids?.length > 0 ? bids[0].min_time : 0,
                [`reasons.${actualReason}.max_time`]: bids?.length > 0 ? bids[0].max_time : 0,
                [`reasons.${actualReason}.total_time`]: bids?.length > 0 ? bids[0].total_time : 0
              }
            ]
          }).exec();
        }

      }
    } else {
      let actualReason = '';

      switch(reason.trim()) {
        case CLIENT_RESPONSE_TYPES.INTERNAL_NO_BUYER_FOUND:
          actualReason = 'internal_no_buyer_found';
          break;
      }

      await this.pingModel.updateOne(
        { start_time, 
          end_time
        },
        {
           $push: { pings: pingRequest._id },
           $inc: { [`reasons.${actualReason}.no_of_pings`]: 1 },
           $set: {
            [`reasons.${actualReason}.min_client_price`]: 0,
            [`reasons.${actualReason}.max_client_price`]: 0,
            [`reasons.${actualReason}.total_client_price`]: 0,
            [`reasons.${actualReason}.total_vendor_price`]: 0,
            [`reasons.${actualReason}.total_revenue_share`]: 0,
            [`reasons.${actualReason}.min_time`]: 0,
            [`reasons.${actualReason}.max_time`]: 0,
            [`reasons.${actualReason}.total_time`]: 0
           },
           $setOnInsert: {
              vendor_id: pingRequest.vendor_id,
              lead_type: pingRequest.lead_type.lead_type_id,
              lead_mode: pingRequest.lead_mode,
           }
        },
        { upsert: true  }
      )
    }
  }

  async savePingRequest(pingRequest: PingDto ): Promise<IncomingRequest> {

    const checkVendor = await this.userModel
        .findById(new Types.ObjectId(pingRequest.vendor_id))
        .exec();

      const lead_type = await this.leadTypeModel.findOne({ lead_type_id: pingRequest.lead_type }).exec();

      const savedRequest = await this.incomingRequestModel.create({
        ...pingRequest,
        _id: new Types.ObjectId(),
        vendor_id: checkVendor,
        lead_type,
        lead_mode: parseInt(pingRequest.lead_mode.toString()),
        ping_time: Date.now(),
        request_type: REQUEST_TYPE.Ping,
        ping_request_payload: JSON.stringify(pingRequest),
      });

      await this.userModel.findByIdAndUpdate(checkVendor._id, { $push: { requests: savedRequest } }, { new: true }).exec();

      const [vendor] = await this.userModel.aggregate([
        { $match:  { _id: checkVendor._id } },
        {
          $lookup: {
            from: 'campaigns',
            localField: '_id',
            foreignField: 'vendors',
            as: 'campaigns'
          }
        },
      ]);

      const clients = [];

      await Promise.allSettled(vendor.campaigns.map(async campaign => {
        clients.push(campaign.client);
      }));

      if(clients.length === 0) {
        throw new Error(`No clients mapped to the vendor ${vendor._id}`);
      }

      return savedRequest;
  }

  async saveLead(request: IncomingRequest, bid: Bid, lead: any, post_id: Schema.Types.ObjectId): Promise<Lead> {

    const lead_type = await this.leadTypeModel.findOne({ lead_type_id: request.lead_type }).exec();

    const vendor = await this.userModel.findById(request.vendor_id).exec();

    return await this.leadModel.create({
      _id: new Types.ObjectId(),
      request: post_id,
      lead_type: lead_type._id,
      client: bid.client._id,
      campaign: bid.campaign._id,
      lead_mode: request.lead_mode,
      vendor_id: vendor._id,
      email: request.email,
      address: request.address,
      primary_phone: request.primary_phone,
      secondary_phone: request.secondary_phone,
      sub_id: request.sub_id,
      tcpa_optin: request.tcpa_optin,
      tcpa_text: request.tcpa_text,
      universal_leadid: request.universal_leadid,
      origination_datetime: request.origination_datetime,
      origination_timezone: request.origination_timezone,
      ipaddress: request.ipaddress,
      user_agent: request.user_agent,
      vendor_lead_id: request.vendor_lead_id,
      url: request.url,
      minimum_price: request.minimum_price,
      zip: request.zip,
      state: request.state,
      city: request.city,
      phone_last_4: request.phone_last_4,
      residence_type: request.residence_type,
      years_at_residence: request.years_at_residence,
      months_at_residence: request.months_at_residence,
      credit_rating: request.credit_rating,
      bankruptcy: request.bankruptcy,
      coverageType: request.coverageType,
      vehicle_comprehensiveDeductible: request.vehicle_comprehensiveDeductible,
      vehicle_collisionDeductible: request.vehicle_collisionDeductible,
      medicalPayment: request.medicalPayment,
      xxtrustedformcerturl: request.xxtrustedformcerturl,
      haveInsurance: request.haveInsurance,
      insuranceCompany: request.insuranceCompany,
      current_policy_start_date: request.current_policy_start_date,
      current_policy_expiration_date: request.current_policy_expiration_date,
      continuously_insured_period: request.continuously_insured_period,
      driver1_firstname: request.driver1_firstname,
      driver1_lastname: request.driver1_lastname,
      driver1_gender: request.driver1_gender,
      driver1_dob: request.driver1_dob,
      driver1_maritalStatus: request.driver1_maritalStatus,
      driver1_education: request.driver1_education,
      driver1_occupation: request.driver1_occupation,
      driver1_requiredSR22: request.driver1_requiredSR22,
      driver1_hasTAVCs: request.driver1_hasTAVCs,
      driver1_numOfIncidents: request.driver1_numOfIncidents,
      driver1_incidentType1: request.driver1_incidentType1,
      driver1_incidentDate1: request.driver1_incidentDate1,
      driver1_ticket1Description: request.driver1_ticket1Description,
      driver1_accident1Description: request.driver1_accident1Description,
      driver1_accident1Damage: request.driver1_accident1Damage,
      driver1_accident1Atfault: request.driver1_accident1Atfault,
      driver1_accident1Amount: request.driver1_accident1Amount,
      driver1_violation1Description: request.driver1_violation1Description,
      driver1_violation1State: request.driver1_violation1State,
      driver1_claim1Description: request.driver1_claim1Description,
      driver1_claim1PaidAmount: request.driver1_claim1PaidAmount,
      driver1_incidentType2: request.driver1_incidentType2,
      driver1_incidentDate2: request.driver1_incidentDate2,
      driver1_ticket2Description: request.driver1_ticket2Description,
      driver1_accident2Description: request.driver1_accident2Description,
      driver1_accident2Damage: request.driver1_accident2Damage,
      driver1_accident2Atfault: request.driver1_accident2Atfault,
      driver1_accident2Amount: request.driver1_accident2Amount,
      driver1_violation2Description: request.driver1_violation2Description,
      driver1_violation2State: request.driver1_violation2State,
      driver1_claim2Description: request.driver1_claim2Description,
      driver1_claim2PaidAmount: request.driver1_claim2PaidAmount,
      driver1_incidentType3: request.driver1_incidentType3,
      driver1_incidentDate3: request.driver1_incidentDate3,
      driver1_ticket3Description: request.driver1_ticket3Description,
      driver1_accident3Description: request.driver1_accident3Description,
      driver1_accident3Damage: request.driver1_accident3Damage,
      driver1_accident3Atfault: request.driver1_accident3Atfault,
      driver1_accident3Amount: request.driver1_accident3Amount,
      driver1_violation3Description: request.driver1_violation3Description,
      driver1_violation3State: request.driver1_violation3State,
      driver1_claim3Description: request.driver1_claim3Description,
      driver1_claim3PaidAmount: request.driver1_claim3PaidAmount,
      driver1_incidentType4: request.driver1_incidentType4,
      driver1_incidentDate4: request.driver1_incidentDate4,
      driver1_ticket4Description: request.driver1_ticket4Description,
      driver1_accident4Description: request.driver1_accident4Description,
      driver1_accident4Damage: request.driver1_accident4Damage,
      driver1_accident4Atfault: request.driver1_accident4Atfault,
      driver1_accident4Amount: request.driver1_accident4Amount,
      driver1_violation4Description: request.driver1_violation4Description,
      driver1_violation4State: request.driver1_violation4State,
      driver1_claim4Description: request.driver1_claim4Description,
      driver1_claim4PaidAmount: request.driver1_claim4PaidAmount,
      driver2_firstname: request.driver2_firstname,
      driver2_lastname: request.driver2_lastname,
      driver2_gender: request.driver2_gender,
      driver2_dob: request.driver2_dob,
      driver2_relationshipToApplicant: request.driver2_relationshipToApplicant,
      driver2_maritalStatus: request.driver2_maritalStatus,
      driver2_education: request.driver2_education,
      driver2_occupation: request.driver2_occupation,
      driver2_requiredSR22: request.driver2_requiredSR22,
      driver2_hasTAVCs: request.driver2_hasTAVCs,
      driver2_numOfIncidents: request.driver2_numOfIncidents,
      driver2_incidentType1: request.driver2_incidentType1,
      driver2_incidentDate1: request.driver2_incidentDate1,
      driver2_ticket1Description: request.driver2_ticket1Description,
      driver2_accident1Description: request.driver2_accident1Description,
      driver2_accident1Damage: request.driver2_accident1Damage,
      driver2_accident1Atfault: request.driver2_accident1Atfault,
      driver2_accident1Amount: request.driver2_accident1Amount,
      driver2_violation1Description: request.driver2_violation1Description,
      driver2_violation1State: request.driver2_violation1State,
      driver2_claim1Description: request.driver2_claim1Description,
      driver2_claim1PaidAmount: request.driver2_claim1PaidAmount,
      driver2_incidentType2: request.driver2_incidentType2,
      driver2_incidentDate2: request.driver2_incidentDate2,
      driver2_ticket2Description: request.driver2_ticket2Description,
      driver2_accident2Description: request.driver2_accident2Description,
      driver2_accident2Damage: request.driver2_accident2Damage,
      driver2_accident2Atfault: request.driver2_accident2Atfault,
      driver2_accident2Amount: request.driver2_accident2Amount,
      driver2_violation2Description: request.driver2_violation2Description,
      driver2_violation2State: request.driver2_violation2State,
      driver2_claim2Description: request.driver2_claim2Description,
      driver2_claim2PaidAmount: request.driver2_claim2PaidAmount,
      driver2_incidentType3: request.driver2_incidentType3,
      driver2_incidentDate3: request.driver2_incidentDate3,
      driver2_ticket3Description: request.driver2_ticket3Description,
      driver2_accident3Description: request.driver2_accident3Description,
      driver2_accident3Damage: request.driver2_accident3Damage,
      driver2_accident3Atfault: request.driver2_accident3Atfault,
      driver2_accident3Amount: request.driver2_accident3Amount,
      driver2_violation3Description: request.driver2_violation3Description,
      driver2_violation3State: request.driver2_violation3State,
      driver2_claim3Description: request.driver2_claim3Description,
      driver2_claim3PaidAmount: request.driver2_claim3PaidAmount,
      driver2_incidentType4: request.driver2_incidentType4,
      driver2_incidentDate4: request.driver2_incidentDate4,
      driver2_ticket4Description: request.driver2_ticket4Description,
      driver2_accident4Description: request.driver2_accident4Description,
      driver2_accident4Damage: request.driver2_accident4Damage,
      driver2_accident4Atfault: request.driver2_accident4Atfault,
      driver2_accident4Amount: request.driver2_accident4Amount,
      driver2_violation4Description: request.driver2_violation4Description,
      driver2_violation4State: request.driver2_violation4State,
      driver2_claim4Description: request.driver2_claim4Description,
      driver2_claim4PaidAmount: request.driver2_claim4PaidAmount,
      driver3_firstname: request.driver3_firstname,
      driver3_lastname: request.driver3_lastname,
      driver3_gender: request.driver3_gender,
      driver3_dob: request.driver3_dob,
      driver3_relationshipToApplicant: request.driver3_relationshipToApplicant,
      driver3_maritalStatus: request.driver3_maritalStatus,
      driver3_education: request.driver3_education,
      driver3_occupation: request.driver3_occupation,
      driver3_requiredSR22: request.driver3_requiredSR22,
      driver3_hasTAVCs: request.driver3_hasTAVCs,
      driver3_numOfIncidents: request.driver3_numOfIncidents,
      driver3_incidentType1: request.driver3_incidentType1,
      driver3_incidentDate1: request.driver3_incidentDate1,
      driver3_ticket1Description: request.driver3_ticket1Description,
      driver3_accident1Description: request.driver3_accident1Description,
      driver3_accident1Damage: request.driver3_accident1Damage,
      driver3_accident1Atfault: request.driver3_accident1Atfault,
      driver3_accident1Amount: request.driver3_accident1Amount,
      driver3_violation1Description: request.driver3_violation1Description,
      driver3_violation1State: request.driver3_violation1State,
      driver3_claim1Description: request.driver3_claim1Description,
      driver3_claim1PaidAmount: request.driver3_claim1PaidAmount,
      driver3_incidentType2: request.driver3_incidentType2,
      driver3_incidentDate2: request.driver3_incidentDate2,
      driver3_ticket2Description: request.driver3_ticket2Description,
      driver3_accident2Description: request.driver3_accident2Description,
      driver3_accident2Damage: request.driver3_accident2Damage,
      driver3_accident2Atfault: request.driver3_accident2Atfault,
      driver3_accident2Amount: request.driver3_accident2Amount,
      driver3_violation2Description: request.driver3_violation2Description,
      driver3_violation2State: request.driver3_violation2State,
      driver3_claim2Description: request.driver3_claim2Description,
      driver3_claim2PaidAmount: request.driver3_claim2PaidAmount,
      driver3_incidentType3: request.driver3_incidentType3,
      driver3_incidentDate3: request.driver3_incidentDate3,
      driver3_ticket3Description: request.driver3_ticket3Description,
      driver3_accident3Description: request.driver3_accident3Description,
      driver3_accident3Damage: request.driver3_accident3Damage,
      driver3_accident3Atfault: request.driver3_accident3Atfault,
      driver3_accident3Amount: request.driver3_accident3Amount,
      driver3_violation3Description: request.driver3_violation3Description,
      driver3_violation3State: request.driver3_violation3State,
      driver3_claim3Description: request.driver3_claim3Description,
      driver3_claim3PaidAmount: request.driver3_claim3PaidAmount,
      driver3_incidentType4: request.driver3_incidentType4,
      driver3_incidentDate4: request.driver3_incidentDate4,
      driver3_ticket4Description: request.driver3_ticket4Description,
      driver3_accident4Description: request.driver3_accident4Description,
      driver3_accident4Damage: request.driver3_accident4Damage,
      driver3_accident4Atfault: request.driver3_accident4Atfault,
      driver3_accident4Amount: request.driver3_accident4Amount,
      driver3_violation4Description: request.driver3_violation4Description,
      driver3_violation4State: request.driver3_violation4State,
      driver3_claim4Description: request.driver3_claim4Description,
      driver3_claim4PaidAmount: request.driver3_claim4PaidAmount,
      driver4_firstname: request.driver4_firstname,
      driver4_lastname: request.driver4_lastname,
      driver4_gender: request.driver4_gender,
      driver4_dob: request.driver4_dob,
      driver4_relationshipToApplicant: request.driver4_relationshipToApplicant,
      driver4_maritalStatus: request.driver4_maritalStatus,
      driver4_education: request.driver4_education,
      driver4_occupation: request.driver4_occupation,
      driver4_requiredSR22: request.driver4_requiredSR22,
      driver4_hasTAVCs: request.driver4_hasTAVCs,
      driver4_numOfIncidents: request.driver4_numOfIncidents,
      driver4_incidentType1: request.driver4_incidentType1,
      driver4_incidentDate1: request.driver4_incidentDate1,
      driver4_ticket1Description: request.driver4_ticket1Description,
      driver4_accident1Description: request.driver4_accident1Description,
      driver4_accident1Damage: request.driver4_accident1Damage,
      driver4_accident1Atfault: request.driver4_accident1Atfault,
      driver4_accident1Amount: request.driver4_accident1Amount,
      driver4_violation1Description: request.driver4_violation1Description,
      driver4_violation1State: request.driver4_violation1State,
      driver4_claim1Description: request.driver4_claim1Description,
      driver4_claim1PaidAmount: request.driver4_claim1PaidAmount,
      driver4_incidentType2: request.driver4_incidentType2,
      driver4_incidentDate2: request.driver4_incidentDate2,
      driver4_ticket2Description: request.driver4_ticket2Description,
      driver4_accident2Description: request.driver4_accident2Description,
      driver4_accident2Damage: request.driver4_accident2Damage,
      driver4_accident2Atfault: request.driver4_accident2Atfault,
      driver4_accident2Amount: request.driver4_accident2Amount,
      driver4_violation2Description: request.driver4_violation2Description,
      driver4_violation2State: request.driver4_violation2State,
      driver4_claim2Description: request.driver4_claim2Description,
      driver4_claim2PaidAmount: request.driver4_claim2PaidAmount,
      driver4_incidentType3: request.driver4_incidentType3,
      driver4_incidentDate3: request.driver4_incidentDate3,
      driver4_ticket3Description: request.driver4_ticket3Description,
      driver4_accident3Description: request.driver4_accident3Description,
      driver4_accident3Damage: request.driver4_accident3Damage,
      driver4_accident3Atfault: request.driver4_accident3Atfault,
      driver4_accident3Amount: request.driver4_accident3Amount,
      driver4_violation3Description: request.driver4_violation3Description,
      driver4_violation3State: request.driver4_violation3State,
      driver4_claim3Description: request.driver4_claim3Description,
      driver4_claim3PaidAmount: request.driver4_claim3PaidAmount,
      driver4_incidentType4: request.driver4_incidentType4,
      driver4_incidentDate4: request.driver4_incidentDate4,
      driver4_ticket4Description: request.driver4_ticket4Description,
      driver4_accident4Description: request.driver4_accident4Description,
      driver4_accident4Damage: request.driver4_accident4Damage,
      driver4_accident4Atfault: request.driver4_accident4Atfault,
      driver4_accident4Amount: request.driver4_accident4Amount,
      driver4_violation4Description: request.driver4_violation4Description,
      driver4_violation4State: request.driver4_violation4State,
      driver4_claim4Description: request.driver4_claim4Description,
      driver4_claim4PaidAmount: request.driver4_claim4PaidAmount,
      vehicle1_year: request.vehicle1_year,
      vehicle1_make: request.vehicle1_make,
      vehicle1_model: request.vehicle1_model,
      vehicle1_subModel: request.vehicle1_subModel,
      vehicle1_vin: request.vehicle1_vin,
      vehicle1_primaryUse: request.vehicle1_primaryUse,
      vehicle1_vehicleOwnership: request.vehicle1_vehicleOwnership,
      vehicle1_dailyMileage: request.vehicle1_dailyMileage,
      vehicle1_annualMileage: request.vehicle1_annualMileage,
      vehicle1_comprehensiveDeductible: request.vehicle1_comprehensiveDeductible,
      vehicle1_collisionDeductible: request.vehicle1_collisionDeductible,
      vehicle2_year: request.vehicle2_year,
      vehicle2_make: request.vehicle2_make,
      vehicle2_model: request.vehicle2_model,
      vehicle2_subModel: request.vehicle2_subModel,
      vehicle2_vin: request.vehicle2_vin,
      vehicle2_primaryUse: request.vehicle2_primaryUse,
      vehicle2_vehicleOwnership: request.vehicle2_vehicleOwnership,
      vehicle2_dailyMileage: request.vehicle2_dailyMileage,
      vehicle2_annualMileage: request.vehicle2_annualMileage,
      vehicle2_comprehensiveDeductible: request.vehicle2_comprehensiveDeductible,
      vehicle2_collisionDeductible: request.vehicle2_collisionDeductible,
      vehicle3_year: request.vehicle3_year,
      vehicle3_make: request.vehicle3_make,
      vehicle3_model: request.vehicle3_model,
      vehicle3_subModel: request.vehicle3_subModel,
      vehicle3_vin: request.vehicle3_vin,
      vehicle3_primaryUse: request.vehicle3_primaryUse,
      vehicle3_vehicleOwnership: request.vehicle3_vehicleOwnership,
      vehicle3_dailyMileage: request.vehicle3_dailyMileage,
      vehicle3_annualMileage: request.vehicle3_annualMileage,
      vehicle3_comprehensiveDeductible: request.vehicle3_comprehensiveDeductible,
      vehicle3_collisionDeductible: request.vehicle3_collisionDeductible,
      vehicle4_year: request.vehicle4_year,
      vehicle4_make: request.vehicle4_make,
      vehicle4_model: request.vehicle4_model,
      vehicle4_subModel: request.vehicle4_subModel,
      vehicle4_vin: request.vehicle4_vin,
      vehicle4_primaryUse: request.vehicle4_primaryUse,
      vehicle4_vehicleOwnership: request.vehicle4_vehicleOwnership,
      vehicle4_dailyMileage: request.vehicle4_dailyMileage,
      vehicle4_annualMileage: request.vehicle4_annualMileage,
      vehicle4_comprehensiveDeductible: request.vehicle4_comprehensiveDeductible,
      vehicle4_collisionDeductible: request.vehicle4_collisionDeductible,
      ping_time: request.ping_time,
      post_time: request.post_time,
      ping_request_payload: request.ping_request_payload,
      client_ping_request_payload: bid.client_request_payload,
      client_ping_response_payload: bid.client_response_payload,
      client_post_request_payload: lead.client_request_payload,
      client_post_response_payload: lead.client_response_payload,
      post_request_payload: request.post_request_payload,
      ping_response_payload: request.ping_response_payload,
      post_response_payload: request.post_response_payload,
      client_ping_confirmation_id: bid.client_ping_confirmation_id,
      client_post_confirmation_id: lead.confirmationID,
      client_lead_status: lead.status,
      status: request.status,
      confirmation_code: bid.confirmation_code,
      client_price: bid.client_price,
      vendor_price: bid.vendor_price,
      revenue_share: bid.revenue_share,
      lead_time: Date.now()
    });
  };

  async savePingResponse(requestId: Schema.Types.ObjectId, response: any, response_status: string) {
    await this.incomingRequestModel.findByIdAndUpdate(requestId, { $set: { ping_response_payload: JSON.stringify(response), response_status } }).exec();
  }

  async savePostResponse(requestId: Schema.Types.ObjectId, response: any, response_status: string) {
    await this.incomingRequestModel.findByIdAndUpdate(requestId, { $set: { post_response_payload: JSON.stringify(response), response_status } }).exec();
  }

  /**
   * This function is used to saved the post request in db.
   * @param postRequest actual request
   * @returns Promise Request
   */
  async savePostRequest(postRequest: PostDto): Promise<IncomingRequest> {

      const bid = await this.bidModel.findOne({ "confirmation_code": postRequest.confirmation_id }).exec();

      const checkVendor = await this.userModel
        .findById(new Types.ObjectId(postRequest.vendor_id))
        .exec();

      if (!bid && postRequest.lead_mode !== 0) {
        return Promise.reject(`No bid found for the post request, invalid confirmation_id ${postRequest.confirmation_id}`);
      }

      let ping_request : any = {};

      if(postRequest.lead_mode === 0) {
        ping_request = await this.incomingRequestModel.findOne({
          confirmation_code: postRequest.confirmation_id
        }).exec();
      } else {
        ping_request = bid.request;
      }

      const lead_type = await this.leadTypeModel.findOne({ lead_type_id: postRequest.lead_type }).exec();

      const savedRequest = await this.incomingRequestModel.create({
        ...postRequest,
        _id: new Types.ObjectId(),
        vendor_id: checkVendor,
        lead_type,
        lead_mode: parseInt(postRequest.lead_mode.toString()),
        post_time: Date.now(),
        request_type: REQUEST_TYPE.Post,
        post_request_payload: JSON.stringify(postRequest),
        ping_request: ping_request,
        client: bid?.client,
      });

      if(postRequest.lead_mode === 1) {

        await this.incomingRequestModel.findByIdAndUpdate(bid.request, { $set: { post_request: savedRequest._id } }).exec();

        await this.userModel.findByIdAndUpdate(checkVendor._id, { $push: { requests: savedRequest } }, { new: true }).exec();

        const [vendor] = await this.userModel.aggregate([
          { $match:  { _id: checkVendor._id } },
          {
            $lookup: {
              from: 'campaigns',
              localField: '_id',
              foreignField: 'vendors',
              as: 'campaigns'
            }
          },
        ]);

        const clients = [];
    
        await Promise.all(vendor.campaigns.map(async campaign => {
          clients.push(campaign.client);
        }));
  
        if(clients.length === 0) {
          throw new Error(`No clients mapped to the vendor ${vendor._id}`);
        }
  
        const outgoingClients = [];
        const clientData = await this.userModel.findById(bid.client).exec();
        if(clientData.user_status !== USER_ACCOUNT_STATUS.Inactive && clientData.lead_flow_status !== LEAD_FLOW_STATUSES.Paused) {
          await this.outgoingRequestModel.create({
            _id: new Types.ObjectId(),
            incoming_request: savedRequest._id,
            ping_time: Date.now(),
            client: clientData._id,
            request_type: savedRequest.request_type,
            lead_mode: savedRequest.lead_mode,
            lead_type: savedRequest.lead_type._id
          });
          outgoingClients.push(clientData._id);
        }
  
        if(outgoingClients.length === 0) {
          throw new Error(`No active clients mapped to the vendor ${vendor._id}`);
        }
      }

      return await this.incomingRequestModel.findById(savedRequest._id).populate({ path: 'client' }).populate({ path: 'lead_type' }).exec();
  }

  /**
   * This function is used to generate the confirmation code for ping/post requests.
   * @param _id This represents the id to be encrypted.
   * @returns Promise String
   */
  async generateConfirmationCode(_id: string): Promise<string> {
    return await encrypt(_id, this.configService.get<string>('ENCRYPTION_KEY'));
  }

  /**
   * This function is used to set the confirmation code inside the bid collection for the highest bid.
   * @param id This represents the _id of the ping.
   * @param code This represents the confirmation code.
   */
  async setConfirmationCodeInBid(id: Schema.Types.ObjectId, code: string) {
    await this.bidModel.findByIdAndUpdate(id, { confirmation_code: code }).exec();
  }

  /**
   * This functions is used to update the state of the ping/post request.
   * @param id Request Id
   * @param state State
   */
  async setRequestState(id: Schema.Types.ObjectId, status: REQUEST_STATES, confirmation_code: string) {
    const request = await this.incomingRequestModel.findById(id).exec();
    if(request) {
      const ping_time = request.ping_time ? new Date(request.ping_time) : new Date(request.post_time);
      const current_time = new Date();
      const diffValue = Math.abs(current_time.getTime() - ping_time.getTime())/1000;
      await this.incomingRequestModel.findByIdAndUpdate(id, { status, response_time: diffValue, confirmation_code }).exec();
    }
  }

  async validateReturnsFile(request: ClientReturnsFileDto): Promise<ReturnsFileValidationDto> {
    const validation = new ReturnsFileValidationDto();

    if(moment(request.from_date).isAfter(moment(request.to_date))) {
      validation.errors.push(VALIDATION_MESSAGES.invalid_date_range);
      return validation;
    }

    const lead_type = await this.leadTypeModel.findById(request.lead_type_id).exec();

    if(!lead_type) {
      validation.errors.push(VALIDATION_MESSAGES.lead_type_not_present);
      return validation;
    }

    const client = await this.userModel.findById(request.client_id).exec();

    if(!client) {
      validation.errors.push(VALIDATION_MESSAGES.client_not_present);
      return validation;
    }

   return validation;
  }

  async regenerateClientReturnsEmail(request: RegenerateClientReturnsEmailDto): Promise<SendClientReturnsEmailResponseDto> {

    const clientReturnsHistory = await this.clientSentReturnsModel.findById(request.history_id).exec();

    const vendor = await this.userModel.findById(clientReturnsHistory.vendor).exec();

    const addedBy = await this.userModel.findById(new Types.ObjectId(request.added_by)).exec();

    const result = new SendClientReturnsEmailResponseDto();

    const vendor_name = `${vendor.first_name} ${vendor.last_name}`;
    const vendor_email = vendor.email;

    const clientReturns = [];

    await Promise.allSettled(clientReturnsHistory.client_returns.map(async (data) => {
      const returnsData = await this.clientReturnsModel.findById(data).exec();
      clientReturns.push(returnsData);
      return data;
    }));

    if(clientReturns.length > 0) {
      const fileName = `${moment().unix()}.csv`;
      const filePath = path.resolve(__dirname + `/downloads/`, fileName);
      const folderPath = path.resolve(__dirname + `/downloads`);
      if (!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath);
      }
      const writer = createObjectCsvWriter({
        path: filePath,
        header: [
          { id: 'email', title: 'Email' },
          { id: 'first_name', title: 'First Name' },
          { id: 'last_name', title: 'Last Name' },
          { id: 'phone', title: 'Phone' },
          { id: 'return_reason', title: 'Return Reason' },
          { id: 'lead_id', title: 'Lead ID' },
          { id: 'confirmation_id', title: 'Confirmation ID' },
          { id: 'vendor_price', title: 'Price' },
        ],
      });

      await writer.writeRecords(clientReturns);

      const allLeads = clientReturns.map((data) => {
        return data.lead;
      });

      const allClientReturns = clientReturns.map((data) => {
        return data._id;
      });

      const history = await this.clientSentReturnsModel.create({
        _id: new Types.ObjectId(),
        leads: allLeads,
        client_returns: allClientReturns,
        vendor,
        sent_to: vendor_email,
        added_on: moment().tz(CST_TIMEZONE).toDate(),
        added_by: addedBy._id,
        lead_type_id: 5,
        return_month: clientReturnsHistory.return_month,
        return_year: clientReturnsHistory.return_year
      });

      result.history_id = history._id.toString();

      await sendEmail(
        'vendor-returns.ejs',
        {
          vendor_name: vendor_name,
          return_start_month: moment(clientReturnsHistory.return_month, 'M').startOf('month').format('YYYY-MM-DD'),
          return_end_month: moment(clientReturnsHistory.return_month, 'M').format('YYYY-MM-DD')
        },
        vendor_email,
        this.settingsService.adminCCEmailIds,
        this.settingsService.adminBCCEmailIds,
        `Returns Email for ${clientReturnsHistory.return_month}/${clientReturnsHistory.return_year}`,
        fileName,
        filePath,
        this.configService.get<string>('SEND_GRID_EMAIL_SERVER'),
        this.configService.get<string>('SEND_GRID_EMAIL_PORT'),
        this.configService.get<string>('SEND_GRID_EMAIL_USERNAME'),
        this.configService.get<string>('SEND_GRID_EMAIL_PASSWORD'));
    }

    return result;
  }

  async sendClientReturnsEmail(request: SendClientReturnsEmailDto): Promise<SendClientReturnsEmailResponseDto> {

    const clientReturns = await this.clientReturnsModel.find({
      return_month: request.return_month,
      return_year: request.return_year,
      lead_type_id: request.lead_type_id,
      vendor: new Types.ObjectId(request.vendor_id)
    }).exec();

    const vendor = await this.userModel.findById(new Types.ObjectId(request.vendor_id)).exec();

    const addedBy = await this.userModel.findById(new Types.ObjectId(request.added_by)).exec();

    const vendor_name = `${vendor.first_name} ${vendor.last_name}`;
    const vendor_email = vendor.email;

    const result = new SendClientReturnsEmailResponseDto();

    if(clientReturns.length > 0) {
      const fileName = `${moment().unix()}.csv`;
      const filePath = path.resolve(__dirname + `/downloads/`, fileName);
      const folderPath = path.resolve(__dirname + `/downloads`);
      if (!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath);
      }
      const writer = createObjectCsvWriter({
        path: filePath,
        header: [
          { id: 'email', title: 'Email' },
          { id: 'first_name', title: 'First Name' },
          { id: 'last_name', title: 'Last Name' },
          { id: 'phone', title: 'Phone' },
          { id: 'return_reason', title: 'Return Reason' },
          { id: 'lead_id', title: 'Lead ID' },
          { id: 'confirmation_id', title: 'Confirmation ID' },
          { id: 'vendor_price', title: 'Price' },
        ],
      });

      await writer.writeRecords(clientReturns);

      const allLeads = clientReturns.map((data) => {
        return data.lead;
      });

      const allClientReturns = clientReturns.map((data) => {
        return data._id;
      });

      const history = await this.clientSentReturnsModel.create({
        _id: new Types.ObjectId(),
        leads: allLeads,
        client_returns: allClientReturns,
        vendor,
        sent_to: vendor_email,
        added_on: moment().tz(CST_TIMEZONE).toDate(),
        added_by: addedBy._id,
        lead_type_id: 5,
        return_month: request.return_month,
        return_year: request.return_year
      });

      result.history_id = history._id.toString();

      await sendEmail(
        'vendor-returns.ejs',
        {
          vendor_name: vendor_name,
          return_start_month: moment(request.return_month, 'M').startOf('month').format('YYYY-MM-DD'),
          return_end_month: moment(request.return_month, 'M').format('YYYY-MM-DD')
        },
        vendor_email,
        this.settingsService.adminCCEmailIds,
        this.settingsService.adminBCCEmailIds,
        `Returns Email for ${moment(request.return_month).format('MMM YYYY')}`,
        fileName,
        filePath,
        this.configService.get<string>('SEND_GRID_EMAIL_SERVER'),
        this.configService.get<string>('SEND_GRID_EMAIL_PORT'),
        this.configService.get<string>('SEND_GRID_EMAIL_USERNAME'),
        this.configService.get<string>('SEND_GRID_EMAIL_PASSWORD'));
    }

    await Promise.allSettled(clientReturns.map(async (data) => {
      await this.clientReturnsModel.findByIdAndUpdate(data._id, { is_sent: true }).exec();
    }));

    return result;
  }

  async processReturns(request: ClientReturnsFileDto): Promise<ReturnsFileResultDto> {
    const result = new ReturnsFileResultDto();
    result.returnsAdded = [];
    const client = await this.userModel.findById(request.client_id).populate({ path: 'campaign' }).exec();
    const incoming_requests = await this.leadModel.find({
        lead_time: { 
          $gte: new Date(new Date(request.from_date).setHours(0, 0, 0)), $lte: new Date(new Date(request.to_date).setHours(23, 59, 59))
          }
    }).exec();
    await Promise.all(request.returnsData.map(async (data) => {
      let emailExists = false;
      await Promise.all(incoming_requests.map(async (inRequest) => {
        if(inRequest.email === data.email) {
          emailExists = true;
          const returnExists = await this.clientReturnsModel.findOne({ email: data.email }).exec();
          if(!returnExists) {
            const added_by = await this.userModel.findById(request.added_by).exec();

            if (!added_by) {
              throw new Error(`No updated_by user found with the Id ${request.added_by}`);
            }

            await this.clientReturnsModel.create({
              _id: new Types.ObjectId(),
              lead: inRequest._id,
              vendor_price: inRequest.vendor_price,
              client_price: inRequest.client_price,
              revenue_share: inRequest.revenue_share,
              client: client,
              lead_type_id: 5,
              vendor: inRequest.vendor_id,
              campaign: client.campaign._id,
              email: data.email,
              return_code: data.return_code,
              return_comments: data.return_comments,
              return_month: moment().tz(CST_TIMEZONE).format('MM'),
              return_year: moment().tz(CST_TIMEZONE).format('YYYY'),
              is_sent: false,
              added_by: added_by._id,
              added_on: new Date()
            });

            result.returnsAdded.push({
              email: inRequest.email,
              first_name: inRequest.driver1_firstname,
              last_name: inRequest.driver1_lastname,
              phone: inRequest.primary_phone,
              return_reason: data.return_comments.trim(),
              lead_id: inRequest._id.toString(),
              confirmation_id: inRequest.confirmation_code,
              vendor_price: inRequest.vendor_price
            });
          }
        }
      }));

      if(!emailExists) {
        result.leadsNotFound.push(data.email);
      }
    }));

    return result;
  } 

  /**
   * This function will be used to internally validate the ping request checking if the required properties have been passed.
   * @param ping This represents the actual ping request.
   * @param requestType Type of the request ping/post
   * @returns  Promise PingValidationDTO
   */
  async validate(ping: any, requestType: REQUEST_TYPE): Promise<PingValidationDto> {
    const validation = new PingValidationDto([]);

    try {

      //Check if the lead_type exists in the db.
      const lead_type = await this.leadTypeModel.findOne({ lead_type_id: ping.lead_type }).exec();

      if (!lead_type) {
        validation.errors.push(VALIDATION_MESSAGES.invalid_lead_type);
        return validation;
      }

      //Fetch Vendor
      const [vendor] = await this.userModel.aggregate([
        { $match:  { _id: new Types.ObjectId(ping.vendor_id) } },
        {
          $lookup: {
            from: 'campaigns',
            localField: '_id',
            foreignField: 'vendors',
            as: 'campaigns'
          }
        },
        {
          $lookup: {
            from: 'vendorleadtypesettings',
            localField: '_id',
            foreignField: 'vendor',
            as: 'vendor_leadtype_settings'
          }
        },
        {
          $unwind: {
            path: "$vendor_leadtype_settings",
            preserveNullAndEmptyArrays: true
          }
        },
      ]);

      if (!vendor) {
        validation.errors.push(`Property vendor_id is not valid. No such vendor exists.`);
        return validation;
      } else if(vendor?.user_status === USER_ACCOUNT_STATUS.Inactive) {
        validation.errors.push(VALIDATION_MESSAGES.vendor_not_allowed);
        return validation;
      } else if(vendor?.vendor_leadtype_settings?.daily_accepted_cap === undefined || vendor?.vendor_leadtype_settings?.hourly_accepted_cap === undefined) {
        validation.errors.push(VALIDATION_MESSAGES.vendor_caps_not_set);
        return validation;
      }

      const hourlyAcceptedLeads = await this.leadModel.aggregate([
        { $match: {
          vendor_id: vendor._id,
          lead_time: { $gt:  new Date(moment().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'))  }
        } }
      ]);

      const dailyAcceptedLeads = await this.leadModel.aggregate([
        { $match: {
          vendor_id: vendor._id,
          lead_time: { $gt:  new Date(moment().subtract(12, 'hours').format('YYYY-MM-DD HH:mm:ss'))  }
        } }
      ]);

      if(vendor.vendor_leadtype_settings.hourly_accepted_cap !== undefined && vendor.vendor_leadtype_settings.hourly_accepted_cap > 0 && hourlyAcceptedLeads.length >= vendor.vendor_leadtype_settings.hourly_accepted_cap) {
        validation.errors.push(VALIDATION_MESSAGES.vendor_max_hourly_post_cap_reached);
        return validation;
      }

      if(vendor.vendor_leadtype_settings.daily_accepted_cap  !== undefined && vendor.vendor_leadtype_settings.daily_accepted_cap > 0 && dailyAcceptedLeads.length >= vendor.vendor_leadtype_settings.daily_accepted_cap) {
        validation.errors.push(VALIDATION_MESSAGES.vendor_max_daily_post_cap_reached);
        return validation;
      }

      const subIdExists = await this.vendorSubIDModel.findOne({ vendor: vendor._id, sub_id: ping?.sub_id?.toString().trim() }).exec(); 

      if(subIdExists && subIdExists.is_blocked && subIdExists.campaigns.length === 0) {
        validation.errors.push(`sub_id ${ping.sub_id} is blocked.`);
        return validation;
      } else if(!subIdExists) {
        await this.vendorSubIDModel.create({
          _id: new Types.ObjectId(),
          vendor,
          sub_id: ping.sub_id.toString().trim(),
          campaigns: [],
          is_blocked: false
        });
      }

      if (requestType === REQUEST_TYPE.Ping && ping.lead_mode === 1) {
        const jornayaExists = await this.blacklistJornayaIdsModel.findOne({
          vendor: vendor._id,
          universal_leadid: ping.universal_leadid.toLowerCase()
        }).exec();
  
        if(jornayaExists && jornayaExists._id) {
          validation.errors.push(VALIDATION_MESSAGES.duplicate_ping);
          return validation;
        } else {
          await this.blacklistJornayaIdsModel.create({
            _id: new Types.ObjectId(),
            vendor: vendor._id,
            universal_leadid: ping.universal_leadid.toLowerCase()
          });
        }
      }

      const jornayaResponse = await this.vendorService.validationleadID(ping.universal_leadid);

      if (jornayaResponse?.error?.code && jornayaResponse.error.code > 0) {
        validation.errors.push(`validation failed for ${name}, ${jornayaResponse.error.message}`);
        return validation;
      }

      if (
        (ping.zip && !isInt(ping.zip.toString())) ||
        (ping.zip && isInt(ping.zip.toString()) && ping.zip.toString().length > 5)
      ) {
        validation.errors.push(`value for Zip is in-valid, it should be a valid US 5-digit Zip Code.`);
        return validation;
      }
      let zipCode = ping.zip;
      if(ping.zip.toString().length < 5) {
        zipCode = ping.zip.toString().padStart(5, '0');
      }

      //Check in the zip-code db
      const exists = await this.zipCodeModel.findOne({ zip_code: zipCode }, null, { strictQuery: false }).exec();

      if(!exists) {
        validation.errors.push(`Zipcode ${ping.zip} is in-valid, it should be a US Zip code.`);
        return validation;
      }

      if (requestType === REQUEST_TYPE.Post) {

        const bidRequest = await this.bidModel
                                     .findOne({ confirmation_code: ping.confirmation_id })
                                     .populate({ path: 'request' })
                                     .exec();

        if(!bidRequest) {
          validation.errors.push(`Ping request for this post is invalid.`);
          return validation;
        }

        if(bidRequest?.request?.status === REQUEST_STATES.Rejected) {
          validation.errors.push(`Ping request corresponding to this confirmation_id is rejected.`);
          return validation;
        }

        const phoneExists = await this.blacklistPhonesModel.find({ phone: ping.primary_phone }).exec();
        if (phoneExists?.length > 0) {
          validation.errors.push(`Blacklist phone validation failed for ${ping.primary_phone}`);
          return validation;
        }

        const emailExists = await this.blacklistEmailsModel.find({ email: ping.email }).exec();
        if (emailExists?.length > 0) {
          validation.errors.push(`Blacklist email validation failed for ${ping.email}`);
          return validation;
        }

        const result = await this.vendorService.validateBlacklistAliancePhone(
          ping.primary_phone,
        );

        if (!result) {
          validation.errors.push(`Blacklist aliance phone validation failed for ${ping.primary_phone}`);
          return validation;
        }
      }      
    } catch (err) {
      validation.errors.push(`vendor ping validation failed.ERROR:${err.message}`);
    }

    return validation;
  }
}
