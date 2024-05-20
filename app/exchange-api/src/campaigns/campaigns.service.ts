import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import {
  Campaign,
  CampaignDocument,
} from './schemas';
import { Model, Connection, Types } from "mongoose";
import { CreateCampaignDto, GetCampaignsDto, UpdateCampaignDto, CampaignPageDto, PostingSpecDto } from "./dto";
import { scrypt as _scrypt } from "crypto";
import { reduce } from 'lodash';
import { User, UserDocument } from "../users/schemas";
import { LeadType, LeadTypeDocument } from "../verticals/autoinsurance/schemas";
import { PingAcceptedResponse, PingRejectedResponses } from "./responses/ping";
import { PostAcceptedResponse, PostRejectedResponses } from "./responses/post";

@Injectable()
export class CampaignsService {

  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectModel(Campaign.name)
    private campaignModel: Model<CampaignDocument>,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(LeadType.name)
    private leadTypeModel: Model<LeadTypeDocument>,
  ) { }

  async createCampaign(campaignData: CreateCampaignDto) {
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    try {
      const lead_type = await this.leadTypeModel.findById(campaignData.lead_type_id).exec();

      if (!lead_type) {
        throw new Error(`No lead type found with the Id ${campaignData.lead_type_id}`);
      }

      const campaign = await this.campaignModel
        .findOne({ campaign_name: campaignData.campaign_name, lead_type: lead_type._id })
        .exec();

      if (campaign) {
        throw new Error(`Campaign already exists with this name in lead type`);
      }

      const client = await this.userModel.findById(campaignData.client_id).exec();

      if (!client) {
        throw new Error(`Client already exists with this name.`);
      }

      const added_by = await this.userModel.findById(campaignData.added_by).exec();

      if (!added_by) {
        throw new Error(`No added_by user found with the Id ${campaignData.added_by}`);
      }

      const savedCampaign = await this.campaignModel.create({
        _id: new Types.ObjectId(),
        campaign_name: campaignData.campaign_name,
        client_handler_name: campaignData.client_handler_name,
        campaign_status: campaignData.campaign_status,
        lead_type,
        client,
        is_lead_flow_status: campaignData.is_lead_flow_status,
        is_allowed_by_ews: campaignData.is_allowed_by_ews,
        is_accepts_call_center_leads: campaignData.is_accepts_call_center_leads,
        is_sends_returns: campaignData.is_sends_returns,
        min_accepted_quality: campaignData.min_accepted_quality,
        posting_method: campaignData.posting_method,
        ping_test_url: campaignData.ping_test_url,
        ping_live_url: campaignData.ping_live_url,
        post_test_url: campaignData.post_test_url,
        post_live_url: campaignData.post_live_url,
        post_header: campaignData.post_header,
        response_method: campaignData.response_method,
        tier: campaignData.tier,
        posting_time_limit: campaignData.posting_time_limit,
        parameter1: campaignData.parameter1,
        parameter2: campaignData.parameter2,
        parameter3: campaignData.parameter3,
        parameter4: campaignData.parameter4,
        price: campaignData.price,
        is_third_party_verification: campaignData.is_third_party_verification,
        is_auto_verify_numbers: campaignData.is_auto_verify_numbers,
        hourly_accepted_post_cap: campaignData.hourly_accepted_post_cap,
        daily_accepted_post_cap: campaignData.daily_accepted_post_cap,
        daily_ping_cap: campaignData.daily_ping_cap,
        is_tcpa_shield_active: campaignData.is_tcpa_shield_active,
        max_revenue_limit: campaignData.max_revenue_limit,
        start_date: campaignData.start_date,
        end_date: campaignData.end_date,
        bidding_floor_attempt_1: campaignData.bidding_floor_attempt_1,
        bidding_floor_attempt_2: campaignData.bidding_floor_attempt_2,
        bidding_floor_attempt_3: campaignData.bidding_floor_attempt_3,
        bidding_floor_attempt_4: campaignData.bidding_floor_attempt_4,
        bidding_floor_attempt_5: campaignData.bidding_floor_attempt_5,
        adjusted_client_margin: campaignData.adjusted_client_margin,
        notes: campaignData.notes,
        added_on: Date.now(),
        added_by: added_by._id,
        updated_on: Date.now(),
        updated_by: added_by._id
      });

      await this.userModel.findByIdAndUpdate(client._id, { $set: { campaign: savedCampaign._id } }).exec();

      await transactionSession.commitTransaction();
      return savedCampaign;
    } catch (err) {
      await transactionSession.abortTransaction();
      throw new BadRequestException(`Could not create campaign.${err.message}`);
    } finally {
      await transactionSession.endSession();
    }
  }

  async deleteCampaign(campaign_id: string): Promise<boolean> {
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    try {
      await this.campaignModel.findByIdAndDelete(campaign_id).exec();

      return true;
    } catch (err) {
      await transactionSession.abortTransaction();
      throw new BadRequestException(`Could not delete campaign.${err.message}`);
    } finally {
      await transactionSession.endSession();
    }
  }

  async updateCampaign(request: UpdateCampaignDto, campaign_id: string): Promise<Campaign> {
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    try {
      const updatedObj = {};
      //Fetch User
      let savedCampaign = await this.campaignModel
        .findById(campaign_id)
        .session(transactionSession)
        .exec();

      if (!savedCampaign) {
        throw new Error(`No campaign found with the Id ${campaign_id}`);
      }

      const updated_by = await this.userModel.findById(request.updated_by).exec();

      if (!updated_by) {
        throw new Error(`No updated_by user found with the Id ${request.updated_by}`);
      }

      const lead_type = await this.leadTypeModel.findById(request.lead_type_id).exec();

      if (!lead_type) {
        throw new Error(`No lead type found with the Id ${request.lead_type_id}`);
      }

      const client = await this.userModel.findById(request.client_id).exec();

      if (!client) {
        throw new Error(`Client already exists with this name.`);
      }

      updatedObj['updated_by'] = updated_by;
      updatedObj['updated_on'] = Date.now();

      if (request.campaign_name) {
        updatedObj['campaign_name'] = request.campaign_name;
      }
      if (request.client_handler_name) {
        updatedObj['client_handler_name'] = request.client_handler_name;
      }
      if (request.campaign_status) {
        updatedObj['campaign_status'] = request.campaign_status;
      }
      if (request.lead_type_id) {
        updatedObj['lead_type'] = lead_type;
      }
      if (request.client_id) {
        updatedObj['client'] = client;
      }
      if (request.is_lead_flow_status !== undefined) {
        updatedObj['is_lead_flow_status'] = request.is_lead_flow_status;
      }
      if (request.is_allowed_by_ews !== undefined) {
        updatedObj['is_allowed_by_ews'] = request.is_allowed_by_ews;
      }
      if (request.is_accepts_call_center_leads !== undefined) {
        updatedObj['is_accepts_call_center_leads'] = request.is_accepts_call_center_leads;
      }
      if (request.is_sends_returns !== undefined) {
        updatedObj['is_sends_returns'] = request.is_sends_returns;
      }
      if (request.min_accepted_quality) {
        updatedObj['min_accepted_quality'] = request.min_accepted_quality;
      }
      if (request.posting_method) {
        updatedObj['posting_method'] = request.posting_method;
      }
      if (request.ping_test_url) {
        updatedObj['ping_test_url'] = request.ping_test_url;
      }
      if (request.ping_live_url) {
        updatedObj['ping_live_url'] = request.ping_live_url;
      }
      if (request.post_test_url) {
        updatedObj['post_test_url'] = request.post_test_url;
      }
      if (request.post_live_url) {
        updatedObj['post_live_url'] = request.post_live_url;
      }
      if (request.post_header) {
        updatedObj['post_header'] = request.post_header;
      }
      if (request.response_method) {
        updatedObj['response_method'] = request.response_method;
      }
      if (request.tier) {
        updatedObj['tier'] = request.tier;
      }
      if (request.posting_time_limit) {
        updatedObj['posting_time_limit'] = request.posting_time_limit;
      }
      if (request.parameter1) {
        updatedObj['parameter1'] = request.parameter1;
      }
      if (request.parameter2) {
        updatedObj['parameter2'] = request.parameter2;
      }
      if (request.parameter3) {
        updatedObj['parameter3'] = request.parameter3;
      }
      if (request.parameter4) {
        updatedObj['parameter4'] = request.parameter4;
      }
      if (request.price) {
        updatedObj['price'] = request.price;
      }
      if (request.is_third_party_verification !== undefined) {
        updatedObj['is_third_party_verification'] = request.is_third_party_verification;
      }
      if (request.is_auto_verify_numbers !== undefined) {
        updatedObj['is_auto_verify_numbers'] = request.is_auto_verify_numbers;
      }
      if (request.hourly_accepted_post_cap) {
        updatedObj['hourly_accepted_post_cap'] = request.hourly_accepted_post_cap;
      }
      if (request.daily_accepted_post_cap) {
        updatedObj['daily_accepted_post_cap'] = request.daily_accepted_post_cap;
      }
      if (request.daily_ping_cap) {
        updatedObj['daily_ping_cap'] = request.daily_ping_cap;
      }
      if (request.is_tcpa_shield_active !== undefined) {
        updatedObj['is_tcpa_shield_active'] = request.is_tcpa_shield_active;
      }
      if (request.max_revenue_limit) {
        updatedObj['max_revenue_limit'] = request.max_revenue_limit;
      }
      if (request.start_date) {
        updatedObj['start_date'] = request.start_date;
      }
      if (request.end_date) {
        updatedObj['end_date'] = request.end_date;
      }
      if (request.bidding_floor_attempt_1) {
        updatedObj['bidding_floor_attempt_1'] = request.bidding_floor_attempt_1;
      }
      if (request.bidding_floor_attempt_2) {
        updatedObj['bidding_floor_attempt_2'] = request.bidding_floor_attempt_2;
      }
      if (request.bidding_floor_attempt_3) {
        updatedObj['bidding_floor_attempt_3'] = request.bidding_floor_attempt_3;
      }
      if (request.bidding_floor_attempt_4) {
        updatedObj['bidding_floor_attempt_4'] = request.bidding_floor_attempt_4;
      }
      if (request.bidding_floor_attempt_5) {
        updatedObj['bidding_floor_attempt_5'] = request.bidding_floor_attempt_5;
      }
      if (request.adjusted_client_margin) {
        updatedObj['adjusted_client_margin'] = request.adjusted_client_margin;
      }
      if (request.notes) {
        updatedObj['notes'] = request.notes;
      }

      

      await this.campaignModel.findByIdAndUpdate(campaign_id, {
        ...updatedObj,
        ...{ $set: { vendors: request.vendors.map((vendor_id) => new Types.ObjectId(vendor_id)) } }
      }).populate({ path: 'client' }).populate({ path: 'lead_type' }).exec();

      const [updatedCampaign] = await this.campaignModel.aggregate([
        { $match: { _id: new Types.ObjectId(campaign_id) } },
        {
          $lookup: {
            from: 'users',
            localField: 'client',
            foreignField: '_id',
            as: 'client'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'vendors',
            foreignField: '_id',
            as: 'vendors'
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
        }
      ]);
      /*const updatedCampaign = await this.campaignModel.findById(campaign_id)
        .populate({ path: 'client' })
        .populate({ path: 'lead_type' })
        .populate({ path: 'vendors' })
        .exec();*/

      await transactionSession.commitTransaction();
      return updatedCampaign;
    } catch (err) {
      await transactionSession.abortTransaction();
      throw new BadRequestException(`Could not update campaign.${err.message}`);
    } finally {
      await transactionSession.endSession();
    }
  }

  async fetchPostingSpecs(): Promise<PostingSpecDto> {

    const postingSpec = new PostingSpecDto();

    const lead_type = await this.leadTypeModel.findOne({ lead_type_id: 5 }).exec();

    postingSpec.lead_type = lead_type.lead_type;

    postingSpec.ping_accepted_response = PingAcceptedResponse;

    postingSpec.ping_rejected_responses = PingRejectedResponses;

    postingSpec.post_accepted_response = PostAcceptedResponse;

    postingSpec.post_rejected_responses = PostRejectedResponses;

    return postingSpec;
  }

  async fetchCampaignById(campaign_id: string): Promise<Campaign> {
    const [campaign] = await this.campaignModel.aggregate([
      { $match: { _id: new Types.ObjectId(campaign_id) } },
      {
        $lookup: {
          from: 'users',
          localField: 'vendors',
          foreignField: '_id',
          as: 'vendors'
        }
      },
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
      }
    ]);
    return campaign;
    /*return await this.campaignModel
      .findById(campaign_id)
      .populate({ path: 'client' })
      .populate({ path: 'lead_type' })
      .populate({ path: 'vendor_campaign_settings', populate: { path: 'vendor' } })
      .exec();*/
  }

  async fetchAllCampaigns(body: GetCampaignsDto): Promise<CampaignPageDto> {

    const sorting = body.sort.map((sort) => {
      if (sort.field === 'campaign_name') {
        if (sort.sort === 'asc') {
          return { campaign_name: 1 };
        } else {
          return { campaign_name: -1 };
        }
      }
    })
    const sortOptions = reduce(sorting, srt => {
      return srt;
    });

    const filters = body.filters.map((filter) => {
      if (filter.field === 'client') {
        return { client: new Types.ObjectId(filter.value) };
      }
      if (filter.field === 'lead_type') {
        return { lead_type: new Types.ObjectId(filter.value) };
      }
      if (filter.field === 'campaign_name' && filter.value?.length > 0) {
        if (filter.operator === 'contains') {
          return { campaign_name: { '$regex': filter.value, $options: 'i' } };
        } else {
          return { campaign_name: { $eq: filter.value } };
        }
      }
      if (filter.field === 'campaign_status' && filter.value?.toString().length > 0) {
        if (filter.value === true && filter.operator === '=') {
          return { campaign_status: { $or: [{ $eq: 'active_live' }, { $eq: 'active_text' }]  } };
        } else if (filter.value === true && filter.operator === '!=') {
          return { campaign_status: { $eq: 'inactive' } };
        } else if (filter.value === false && filter.operator === '=') {
          return { campaign_status: { $eq: 'inactive' } };
        } else if (filter.value === false && filter.operator === '!=') {
          return { campaign_status: { $or: [{ $eq: 'active_live' }, { $eq: 'active_text' }]  } };
        }
      }
    });
    const filterOptions = reduce(filters, fltr => {
      return fltr;
    });

    const campaigns = await this.campaignModel.aggregate([
      { $match: filterOptions || {} },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'campaign',
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
          from: 'leadtypes',
          localField: '_id',
          foreignField: 'campaigns',
          as: 'lead_type'
        }
      },
      {
        $unwind: {
          path: "$lead_type",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          campaign_name: 1,
          campaign_status: 1,
          'lead_type.lead_type': 1,
          'client.username': 1,
          is_lead_flow_status: 1,
          is_allowed_by_ews: 1,
        }
      },
      { $sort: sortOptions || { campaign_name: 1 } },
      { $skip: body.page_offset * body.page_size },
      { $limit: body.page_size }
    ]);

    const count = await this.campaignModel.countDocuments(filterOptions).exec();
    const totalPages = Math.floor((count - 1) / body.page_size) + 1;

    return new CampaignPageDto(campaigns, totalPages);
  }

}
