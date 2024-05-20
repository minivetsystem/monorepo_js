import { Injectable } from "@nestjs/common";
import { InjectModel, InjectConnection } from "@nestjs/mongoose";
import { Model, Connection, Types } from "mongoose";
import { User, UserDocument } from "../../users/schemas";
import {
  LeadType,
  LeadTypeDocument,
  IncomingRequestDocument,
  IncomingRequest,
  Bid,
  BidDocument,
  IncomingRequestArchieve,
  IncomingRequestArchieveDocument,
  Ping,
  PingDocument,
  Post,
  PostDocument,
  ClientReturn,
  ClientReturnDocument,
  ClientSentReturn,
  ClientSentReturnDocument,
  Lead,
  LeadDocument
} from "../../verticals/autoinsurance/schemas";
import { KPISummaryDto } from "./dto/kpi-summary.dto";
import {
  CST_TIMEZONE,
  BLUE_COLOR,
  CLIENT_RESPONSE_TYPES,
  GREEN_COLOR,
  LEAD_TYPES,
  LEAD_TYPES_ENUM,
  RED_COLOR,
  REQUEST_TYPE,
  RESPONSE_TYPE,
  USER_TYPES,
  YELLOW_COLOR
} from "../../config/constants";
import {
  CommissionsReportResponseDto,
  CommissionsReportVendorResponseDto,
  GetCommissionsReportDto,
  GetInboundReportDto,
  GetInboundSubReportDto,
  GetOutboundClientReportDto,
  GetOutboundReportDto,
  GetRequestsByReasonReportDto,
  GetReturnsSuiteReportDto,
  GetRevenueMatrixReportDto,
  InboundReportDto,
  KPISummaryResponseDto,
  LeadTypeDto,
  ReturnsSuiteResponseDto,
  RevenueMatrixMainDayResponseDto,
  RevenueMatrixMainSummaryResponseDto,
  RevenueMatrixResponseDto
} from "./dto";
import { filter, round, sumBy } from "lodash";
import {
  OutboundClientPingPostResultReportDto
} from "./dto/outbound-client-ping-post-result-report.dto";
import {
  AutoInsuranceAcceptedPost,
  AutoInsuranceAcceptedPostDocument,
  AutoInsuranceBid,
  AutoInsuranceBidDocument,
  AutoInsuranceKPIRevenueDetail,
  AutoInsuranceKPIRevenueDetailDocument,
  AutoInsuranceOutPing,
  AutoInsuranceOutPingDocument,
  AutoInsuranceOutPost,
  AutoInsuranceOutPostDocument,
  AutoInsurancePing,
  AutoInsurancePingDocument,
  AutoInsurancePingsForBid,
  AutoInsurancePingsForBidDocument,
  AutoInsurancePost,
  AutoInsurancePostDocument
} from "./schemas";
import moment from "moment-timezone";
import {
  OutboundPingPostResultReportDto
} from "./dto/outbound-ping-post-result-report.dto";
import {
  OutboundPingPostResultDetailsDto
} from "./dto/outbound-ping-post-result-details.dto";
import {
  OutboundPingPostResultClientDto
} from "./dto/outbound-ping-post-result-client.dto";

@Injectable()
export class ReportsService {

  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(IncomingRequest.name)
    private incomingRequestModel: Model<IncomingRequestDocument>,
    @InjectModel(IncomingRequestArchieve.name)
    private incomingRequestArchieveModel: Model<IncomingRequestArchieveDocument>,
    @InjectModel(AutoInsurancePost.name)
    private autoInsurancePostModel: Model<AutoInsurancePostDocument>,
    @InjectModel(AutoInsuranceBid.name)
    private autoInsuranceBidModel: Model<AutoInsuranceBidDocument>,
    @InjectModel(AutoInsuranceAcceptedPost.name)
    private autoInsuranceAcceptedPostModel: Model<AutoInsuranceAcceptedPostDocument>,
    @InjectModel(AutoInsuranceOutPost.name)
    private autoInsuranceOutPostModel: Model<AutoInsuranceOutPostDocument>,
    @InjectModel(AutoInsurancePing.name)
    private autoInsurancePingModel: Model<AutoInsurancePingDocument>,
    @InjectModel(AutoInsuranceOutPing.name)
    private autoInsuranceOutPingModel: Model<AutoInsuranceOutPingDocument>,
    @InjectModel(AutoInsurancePingsForBid.name)
    private autoInsurancePingsForBidModel: Model<AutoInsurancePingsForBidDocument>,
    @InjectModel(AutoInsuranceKPIRevenueDetail.name)
    private autoInsuranceKPIRevenueDetailModel: Model<AutoInsuranceKPIRevenueDetailDocument>,
    @InjectModel(LeadType.name)
    private leadTypeModel: Model<LeadTypeDocument>,
    @InjectModel(Bid.name)
    private bidModel: Model<BidDocument>,
    @InjectModel(Ping.name)
    private pingModel: Model<PingDocument>,
    @InjectModel(Post.name)
    private postModel: Model<PostDocument>,
    @InjectModel(ClientReturn.name)
    private clientReturnsModel: Model<ClientReturnDocument>,
    @InjectModel(ClientSentReturn.name)
    private clientSentReturnsModel: Model<ClientSentReturnDocument>,
    @InjectModel(Lead.name)
    private leadModel: Model<LeadDocument>
  ) {
  }

  async fetchReturnsSuiteReport(request: GetReturnsSuiteReportDto): Promise<ReturnsSuiteResponseDto> {

    const startDate = moment(request.start_date, "YYYY-MM-DD HH:mm:ss").tz(CST_TIMEZONE);
    const endDate = moment(request.end_date, "YYYY-MM-DD HH:mm:ss").tz(CST_TIMEZONE);

    const client_id = request.client_id;

    const params = {
      start_time: { $gte: startDate.toDate() },
      end_time: { $lte: endDate.toDate() }
    };

    if (client_id?.length > 0) {
      params["client_id"] = new Types.ObjectId(request.client_id);
    }

    const response = new ReturnsSuiteResponseDto();

    const summaryData = await this.postModel.aggregate([
      {
        $match: params
      },
      {
        $project: {
          lead_type: 1,
          vendor_id: 1,
          lead_count: { $size: "$leads" }
        }
      },
      {
        $group: {
          _id: {
            lead_type: "$lead_type",
            vendor_id: "$vendor_id"
          },
          total_leads: { $sum: "$lead_count" }
        }
      },
      {
        $project: {
          _id: 0,
          lead_type: "$_id.lead_type",
          vendor_id: "$_id.vendor_id",
          total_leads: "$total_leads"
        }
      },
      {
        $lookup: {
          from: "clientreturns",
          localField: "vendor_id",
          foreignField: "vendor",
          as: "returns"
        }
      },
      {
        $project: {
          lead_type: "$lead_type",
          vendor_id: "$vendor_id",
          total_leads: "$total_leads",
          total_return_leads: { $size: "$returns" },
          total_return_leads_sent: {
            $size: {
              $filter: {
                input: "$returns",
                as: "returns",
                cond: { $eq: ["$$returns.is_sent", true] }
              }
            }
          },
          total_return_client_price: { $sum: "$returns.client_price" },
          total_return_vendor_price: { $sum: "$returns.vendor_price" },
          return_rate: { $round: [{ $multiply: [{ $divide: [{ $size: "$returns" }, "$total_leads"] }, 100] }, 2] }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "vendor_id",
          foreignField: "_id",
          as: "vendor"
        }
      },
      {
        $unwind: {
          path: "$vendor",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "leadtypes",
          localField: "lead_type",
          foreignField: "lead_type_id",
          as: "lead_type"
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
          lead_type_id: "$lead_type.lead_type_id",
          lead_type: "$lead_type.lead_type",
          vendor_id: "$vendor_id",
          vendor_name: { $concat: ["$vendor.first_name", " ", "$vendor.last_name"] },
          vendor_returns_emails: "$vendor.returns_email_list",
          total_leads: "$total_leads",
          total_return_leads: "$total_return_leads",
          total_return_leads_sent: "$total_return_leads_sent",
          total_return_leads_not_sent: { $subtract: ["$total_return_leads", "$total_return_leads_sent"] },
          total_return_client_price: { $round: ["$total_return_client_price", 2] },
          total_return_vendor_price: { $round: ["$total_return_vendor_price", 2] },
          return_rate: "$return_rate"
        }
      }
    ]);

    response.summary = summaryData.map((data, idx) => {
      return {
        ...data,
        row_no: idx + 1,
        return_rate: `${data.return_rate}%`,
        total_return_client_price: `$${data.total_return_client_price}`,
        total_return_vendor_price: `$${data.total_return_vendor_price}`,
        show_generate_link: data.total_return_leads_not_sent === 0 ? false : true
      };
    });

    const historyData = await this.clientSentReturnsModel.aggregate([
      {
        $lookup: {
          from: "leadtypes",
          localField: "lead_type_id",
          foreignField: "lead_type_id",
          as: "lead_type"
        }
      },
      {
        $unwind: {
          path: "$lead_type",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "vendor",
          foreignField: "_id",
          as: "vendor"
        }
      },
      {
        $unwind: {
          path: "$vendor",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "added_by",
          foreignField: "_id",
          as: "admin"
        }
      },
      {
        $unwind: {
          path: "$admin",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          lead_type_id: "$lead_type.lead_type_id",
          lead_type: "$lead_type.lead_type",
          vendor_id: "$vendor._id",
          vendor_name: { $concat: ["$vendor.first_name", " ", "$vendor.last_name"] },
          return_month: 1,
          return_year: 1,
          generated_on: {
            $dateToString: {
              date: "$added_on",
              timezone: CST_TIMEZONE,
              format: "%Y-%m-%d %H:%M:%S"
            }
          },
          generated_by: { $concat: ["$admin.first_name", " ", "$admin.last_name"] },
          sent_to: 1,
          no_of_leads: { $size: "$leads" }
        }
      }
    ]);

    response.history = historyData.map((data, idx) => {
      return {
        row_no: idx + 1,
        return_period: `${data.return_month}/${data.return_year}`,
        ...data
      };
    });

    return response;
  };

  async fetchCommissionsReport(request: GetCommissionsReportDto): Promise<CommissionsReportResponseDto> {

    const startDate = moment(request.start_date, "YYYY-MM-DD").toDate();
    const endDate = moment(request.end_date, "YYYY-MM-DD").toDate();

    const params = {
      lead_time: {
        $gte: moment(startDate).tz(CST_TIMEZONE).startOf("day").toDate(),
        $lte: moment(endDate).tz(CST_TIMEZONE).endOf("day").tz(CST_TIMEZONE).toDate()
      }
    };

    const allLeads = await this.leadModel.aggregate([
      { $match: params },
      {
        $group: {
          _id: {
            vendor_id: "$vendor_id",
            lead_type: "$lead_type"
          },
          total_vendor_price: { $sum: "$vendor_price" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id.vendor_id",
          foreignField: "_id",
          as: "vendor"
        }
      },
      {
        $unwind: {
          path: "$vendor",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "leadtypes",
          localField: "_id.lead_type",
          foreignField: "_id",
          as: "lead_type"
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
          _id: 0,
          vendor_id: "$vendor._id",
          lead_type_id: "$lead_type.lead_type_id",
          lead_type: "$lead_type.lead_type",
          vendor_name: { $concat: ["$vendor.first_name", " ", "$vendor.last_name"] },
          payment_method: "$vendor.payment_method",
          vendor_price: "$total_vendor_price",
          invoice_notes: "$vendor.invoice_notes"
        }
      }
    ]);

    const response = new CommissionsReportResponseDto();

    response.data = [];

    await Promise.all(allLeads.map((lead, idx) => {
      const vendorResponse = new CommissionsReportVendorResponseDto();
      vendorResponse.row_no = idx + 1,
        vendorResponse.vendor_id = lead.vendor_id,
        vendorResponse.vendor_name = lead.vendor_name,
        vendorResponse.lead_type_id = lead.lead_type_id,
        vendorResponse.lead_type = lead.lead_type,
        vendorResponse.vendor_price = `$${lead.vendor_price}`,
        vendorResponse.payment_method = lead.payment_method,
        vendorResponse.invoice_notes = lead.invoice_notes;
      response.data.push(vendorResponse);
    }));

    response.total_vendor_price = `${sumBy(response.data, "vendor_price")}`;

    return response;
  }

  async fetchOutboundClientPingData(params: any, isArchieve: boolean) {
    const conditions = [
      {
        $lookup: {
          from: "campaigns",
          localField: "bids.campaign",
          foreignField: "_id",
          as: "campaign"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "bids.client",
          foreignField: "_id",
          as: "client"
        }
      },
      {
        $lookup: {
          from: "leadtypes",
          localField: "lead_type",
          foreignField: "_id",
          as: "lead_type"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "vendor_id",
          foreignField: "_id",
          as: "vendor"
        }
      },
      {
        $unwind: {
          path: "$campaign",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$client",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$lead_type",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$vendor",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$bids",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          lead_type: "$lead_type.lead_type",
          vendor_id: "$vendor._id",
          client_id: "$client._id",
          client_name: { $concat: ["$client.first_name", " ", "$client.last_name"] },
          campaign_id: "$campaign._id",
          campaign_name: "$campaign.campaign_name",
          vendor_name: { $concat: ["$vendor.first_name", " ", "$vendor.last_name"] },
          client_rejection_reason: "$bids.client_rejection_reason",
          client_status: "$bids.client_status",
          response_time: { $ifNull: ["$response_time", 0] },
          client_price: { $ifNull: ["$bids.client_price", 0] }
        }
      },
      {
        $group: {
          _id: {
            lead_type: "$lead_type",
            vendor_id: "$vendor_id",
            client_id: "$client_id",
            client_name: "$client_name",
            campaign_id: "$campaign_id",
            campaign_name: "$campaign_name",
            vendor_name: "$vendor_name",
            client_status: "$client_status",
            client_rejection_reason: "$client_rejection_reason"
          },
          count: {
            $sum: 1
          },
          avg_time: {
            $avg: "$response_time"
          },
          min_time: {
            $min: "$response_time"
          },
          max_time: {
            $max: "$response_time"
          },
          avg_bid_price: {
            $avg: "$client_price"
          },
          min_bid_price: {
            $min: "$client_price"
          },
          max_bid_price: {
            $max: "$client_price"
          }
        }
      },
      {
        $project: {
          _id: 0,
          lead_type: "$_id.lead_type",
          vendor_id: "$_id.vendor_id",
          vendor_name: "$_id.vendor_name",
          client_id: "$_id.client_id",
          client_name: "$_id.client_name",
          campaign_id: "$_id.campaign_id",
          campaign_name: "$_id.campaign_name",
          client_status: "$_id.client_status",
          client_rejection_reason: "$_id.client_rejection_reason",
          count: "$count",
          min_ping_time: "$min_time",
          max_ping_time: "$max_time",
          avg_ping_time: "$avg_time",
          min_bid_price: "$min_bid_price",
          max_bid_price: "$max_bid_price",
          avg_bid_price: "$avg_bid_price"
        }
      }
    ];

    let resultData = await this.incomingRequestModel.aggregate([
      { $match: params },
      {
        $lookup: {
          from: "bids",
          localField: "_id",
          foreignField: "request",
          as: "bids"
        }
      },
      ...conditions
    ]);

    if (isArchieve) {
      const archieveResultData = await this.incomingRequestArchieveModel.aggregate([
        { $match: params },
        {
          $lookup: {
            from: "bidarchieves",
            localField: "_id",
            foreignField: "request",
            as: "bids"
          }
        },
        ...conditions
      ]);
      resultData = resultData.map((data) => {
        if (filter(archieveResultData, {
          vendor_id: data.vendor_id,
          client_rejection_reason: data.client_rejection_reason
        }).length > 0) {
          const newData = filter(archieveResultData, {
            vendor_id: data.vendor_id,
            client_rejection_reason: data.client_rejection_reason
          })[0];
          data.count += newData.count;
          data.min_ping_time += newData.min_ping_time;
          data.max_ping_time += newData.max_ping_time;
          data.avg_ping_time += newData.avg_ping_time;
          data.min_bid_price += newData.min_bid_price;
          data.max_bid_price += newData.max_bid_price;
          data.avg_bid_price += newData.avg_bid_price;
        }
        return data;
      });
      resultData = archieveResultData.map((data) => {
        if (filter(resultData, {
          vendor_id: data.vendor_id,
          client_rejection_reason: data.client_rejection_reason
        }).length === 0) {
          return data;
        } else {
          return filter(resultData, {
            vendor_id: data.vendor_id,
            client_rejection_reason: data.client_rejection_reason
          })[0];
        }
      });
    }
    return resultData;
  }

  async fetchOutboundClientPostData(params: any, isArchieve: boolean) {
    const conditions = [
      {
        $lookup: {
          from: "leads",
          localField: "_id",
          foreignField: "request",
          as: "lead"
        }
      },
      {
        $unwind: {
          path: "$lead",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "campaigns",
          localField: "lead.campaign",
          foreignField: "_id",
          as: "campaign"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "lead.client",
          foreignField: "_id",
          as: "client"
        }
      },
      {
        $lookup: {
          from: "leadtypes",
          localField: "lead_type",
          foreignField: "_id",
          as: "lead_type"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "vendor_id",
          foreignField: "_id",
          as: "vendor"
        }
      },
      {
        $unwind: {
          path: "$campaign",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$client",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$lead_type",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$vendor",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          lead_type: "$lead_type.lead_type",
          vendor_id: "$vendor._id",
          client_id: "$client._id",
          client_name: { $concat: ["$client.first_name", " ", "$client.last_name"] },
          campaign_id: "$campaign._id",
          campaign_name: "$campaign.campaign_name",
          vendor_name: { $concat: ["$vendor.first_name", " ", "$vendor.last_name"] },
          response_time: { $ifNull: ["$response_time", 0] },
          client_rejection_reason: {
            $switch: {
              branches: [
                {
                  case: { $gt: ["$lead.client_price", 0] },
                  then: CLIENT_RESPONSE_TYPES.POST_SUCCESSFUL
                }
              ],
              default: CLIENT_RESPONSE_TYPES.POST_REJECTED
            }
          },
          client_price: { $ifNull: ["$lead.client_price", 0] }
        }
      },
      {
        $group: {
          _id: {
            lead_type: "$lead_type",
            vendor_id: "$vendor_id",
            client_id: "$client_id",
            client_name: "$client_name",
            campaign_id: "$campaign_id",
            campaign_name: "$campaign_name",
            vendor_name: "$vendor_name",
            client_rejection_reason: "$client_rejection_reason"
          },
          count: {
            $sum: 1
          },
          avg_time: {
            $avg: "$response_time"
          },
          min_time: {
            $min: "$response_time"
          },
          max_time: {
            $max: "$response_time"
          },
          avg_bid_price: {
            $avg: "$client_price"
          },
          min_bid_price: {
            $min: "$client_price"
          },
          max_bid_price: {
            $max: "$client_price"
          }
        }
      },
      {
        $project: {
          _id: 0,
          lead_type: "$_id.lead_type",
          vendor_id: "$_id.vendor_id",
          vendor_name: "$_id.vendor_name",
          client_id: "$_id.client_id",
          client_name: "$_id.client_name",
          campaign_id: "$_id.campaign_id",
          campaign_name: "$_id.campaign_name",
          client_rejection_reason: "$_id.client_rejection_reason",
          count: "$count",
          min_ping_time: "$min_time",
          max_ping_time: "$max_time",
          avg_ping_time: "$avg_time",
          min_bid_price: "$min_bid_price",
          max_bid_price: "$max_bid_price",
          avg_bid_price: "$avg_bid_price"
        }
      }
    ];

    let resultData = await this.incomingRequestModel.aggregate([
      { $match: params },
      ...conditions
    ]);
    if (isArchieve) {
      const archieveResultData = await this.incomingRequestArchieveModel.aggregate([
        { $match: params },
        ...conditions
      ]);
      resultData = resultData.map((data) => {
        if (filter(archieveResultData, {
          vendor_id: data.vendor_id,
          client_rejection_reason: data.client_rejection_reason
        }).length > 0) {
          const newData = filter(archieveResultData, {
            vendor_id: data.vendor_id,
            client_rejection_reason: data.client_rejection_reason
          })[0];
          data.count += newData.count;
          data.min_ping_time += newData.min_ping_time;
          data.max_ping_time += newData.max_ping_time;
          data.avg_ping_time += newData.avg_ping_time;
          data.min_bid_price += newData.min_bid_price;
          data.max_bid_price += newData.max_bid_price;
          data.avg_bid_price += newData.avg_bid_price;
        }
        return data;
      });
      const newArchieveData = filter(archieveResultData, (data) => {
        if (filter(resultData, {
          vendor_id: data.vendor_id,
          client_rejection_reason: data.client_rejection_reason
        }).length === 0) {
          return data;
        }
      });
      resultData = [...resultData, ...newArchieveData];
    }
    return resultData;
  }

  async fetchOutboundClientPingPostReport(body: GetOutboundClientReportDto): Promise<OutboundClientPingPostResultReportDto[]> {

    const startDate = moment(body.start_date, "YYYY-MM-DD HH:mm:ss").tz(CST_TIMEZONE);
    const endDate = moment(body.end_date, "YYYY-MM-DD HH:mm:ss").tz(CST_TIMEZONE);

    const isArchieve = moment(startDate).isBefore(moment().tz(CST_TIMEZONE).subtract(1, "day").startOf("day"));

    const params = {
      request_type: body.request_type === "ping" ? "Ping" : "Post",
      lead_mode: body.lead_mode
    };
    if (body.request_type === "ping") {
      params["ping_time"] = {
        $gte: startDate.toDate(),
        $lte: endDate.toDate()
      };
    } else {
      params["post_time"] = {
        $gte: startDate.toDate(),
        $lte: endDate.toDate()
      };
    }
    if (body.vendor_id.length > 0) {
      params["vendor_id"] = new Types.ObjectId(body.vendor_id);
    }

    const response: OutboundClientPingPostResultReportDto[] = [];

    let allRequests = [];
    if (body.request_type === "ping") {
      allRequests = await this.fetchOutboundClientPingData(params, isArchieve);
    } else {
      allRequests = await this.fetchOutboundClientPostData(params, isArchieve);
    }

    await Promise.all(allRequests.map((result, idx) => {
      let error = "";
      if (result.client_status === RESPONSE_TYPE.Accepted && body.request_type === "ping") {
        error = CLIENT_RESPONSE_TYPES.PING_SUCCESSFUL;
      } else if (result.client_status === RESPONSE_TYPE.Accepted && body.request_type === "post") {
        error = CLIENT_RESPONSE_TYPES.POST_SUCCESSFUL;
      } else {
        if (result.client_rejection_reason) {
          error = result.client_rejection_reason.trim();
        } else {
          error = CLIENT_RESPONSE_TYPES.INTERNAL_NO_BUYER_FOUND;
        }
      }

      const data = new OutboundClientPingPostResultReportDto();
      data.id = idx + 1;
      data.vendor_id = result.vendor_id?.toString();
      data.vendor_name = result.vendor_name;
      data.client_id = result.client_id?.toString();
      data.client_name = result.client_name;
      data.campaign_id = result.campaign_id?.toString();
      data.campaign_name = result.campaign_name;
      data.lead_type = result.lead_type;
      data.client_status = result.client_status;
      data.error = error;
      data.count = result.count;
      data.max_ping_time = result.max_ping_time;
      data.min_ping_time = result.min_ping_time;
      data.avg_ping_time = result.avg_ping_time;
      data.max_ping_time = result.max_ping_time;
      data.max_bid_price = result.max_bid_price;
      data.min_bid_price = result.min_bid_price;
      data.avg_bid_price = result.avg_bid_price;
      response.push(data);
    }));

    return response;
  };

  async fetchOutboundPingPostReport(request: GetOutboundReportDto): Promise<OutboundPingPostResultReportDto> {

    const response = new OutboundPingPostResultReportDto();

    const params = {
      start_time: { $gte: moment(request.start_date, "YYYY-MM-DD").tz(CST_TIMEZONE).startOf("day").toDate() },
      end_time: { $lte: moment(request.end_date, "YYYY-MM-DD").tz(CST_TIMEZONE).endOf("day").toDate() }
    };

    const returnsParams = {
      added_on: {
        $gte: moment(request.start_date, "YYYY-MM-DD").tz(CST_TIMEZONE).startOf("day").toDate(),
        $lte: moment(request.end_date, "YYYY-MM-DD").tz(CST_TIMEZONE).startOf("day").toDate()
      }
    };

    if (request.vendor_id?.length > 0) {
      params["vendor_id"] = new Types.ObjectId(request.vendor_id);
      returnsParams["vendor"] = new Types.ObjectId(request.vendor_id);
    }

    if (request.client_id?.length > 0) {
      params["client_id"] = new Types.ObjectId(request.client_id);
      returnsParams["client"] = new Types.ObjectId(request.client_id);
    }

    if (request.campaign_id?.length > 0) {
      params["campaign_id"] = new Types.ObjectId(request.campaign_id);
      returnsParams["campaign"] = new Types.ObjectId(request.campaign_id);
    }

    const pingData: any = await this.pingModel.aggregate([
      {
        $match: params
      },
      {
        $group: {
          _id: null,
          total_pings: { $sum: 1 },
          total_successful_pings: { $sum: "$client_reasons.ping_successful.no_of_pings" },
          total_client_validation_failed_pings: { $sum: "$client_reasons.client_validation_failed.no_of_pings" },
          total_duplicate_pings: { $sum: "$client_reasons.duplicate.no_of_pings" },
          lead_cap_exhausted_pings: { $sum: "$client_reasons.lead_cap_exhausted.no_of_pings" },
          beyond_expected_schedule_pings: { $sum: "$client_reasons.beyond_expected_schedule.no_of_pings" },
          vendor_account_disabled_pings: { $sum: "$client_reasons.vendor_account_disabled.no_of_pings" },
          internal_rejected_pings: { $sum: "$client_reasons.internal_no_buyer_found.no_of_pings" },
          internal_new_rejected_pings: { $sum: "$reasons.no_of_pings" }
        }
      },
      {
        $project: {
          total_inbound_pings: "$total_pings",
          total_outbound_pings: { $sum: ["$total_successful_pings", "$total_client_validation_failed_pings", "$total_duplicate_pings", "$lead_cap_exhausted_pings", "$beyond_expected_schedule_pings", "$client_account_disabled_pings"] },
          total_inbound_accepted_pings: "$total_successful_pings",
          total_outbound_accepted_pings: "$total_successful_pings",
          total_inbound_rejected_pings: { $sum: ["$internal_new_rejected_pings", "$internal_rejected_pings"] },
          total_outbound_rejected_pings: { $sum: ["$total_client_validation_failed_pings", "$total_duplicate_pings", "$lead_cap_exhausted_pings", "$beyond_expected_schedule_pings", "$client_account_disabled_pings"] }
        }
      }
    ]);

    const postData: any = await this.postModel.aggregate([
      {
        $match: params
      },
      {
        $lookup: {
          from: "users",
          localField: "client_id",
          foreignField: "_id",
          as: "client"
        }
      },
      {
        $unwind: {
          path: "$client",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          client_id: "$client._id",
          client_name: { $concat: ["$client.first_name", " ", "$client.last_name"] },
          reasons: "$reasons"
        }
      },
      {
        $group: {
          _id: {
            client_id: "$client_id",
            client_name: "$client_name"
          },
          total_accepted_posts: { $sum: "$reasons.post_accepted.no_of_posts" },
          total_rejected_posts: { $sum: "$reasons.post_rejected.no_of_posts" },
          total_gross_revenue: { $sum: "$reasons.post_accepted.total_client_price" },
          total_vendor_price: { $sum: "$reasons.post_accepted.total_vendor_price" }
        }
      },
      {
        $project: {
          client_id: "$_id.client_id",
          client_name: "$_id.client_name",
          total_posts: { $sum: ["$total_accepted_posts", "$total_rejected_posts"] },
          total_accepted_posts: "$total_accepted_posts",
          total_rejected_posts: "$total_rejected_posts",
          total_gross_revenue: "$total_gross_revenue",
          total_vendor_price: "$total_vendor_price"
        }
      }
    ]);

    const returnsData: any = await this.clientReturnsModel.aggregate([
      {
        $match: returnsParams
      },
      {
        $group: {
          _id: null,
          total_returns: { $sum: 1 },
          total_returns_revenue: { $sum: "$client_price" }
        }
      }
    ]);

    const inboundData = new OutboundPingPostResultDetailsDto();

    inboundData.category = "INBOUND";
    inboundData.total_pings = pingData[0].total_inbound_pings || 0;
    inboundData.accepted_pings = pingData[0].total_inbound_accepted_pings || 0;
    inboundData.rejected_pings = pingData[0].total_inbound_rejected_pings || 0;
    inboundData.total_posts = postData[0].total_posts || 0;
    inboundData.accepted_posts = postData[0].total_accepted_posts || 0;
    inboundData.rejected_posts = postData[0].total_rejected_posts || 0;
    inboundData.returned_posts = returnsData[0]?.total_returns || 0;
    inboundData.net_leads_delivered = postData[0].total_posts - (returnsData[0]?.total_returns || 0) || 0;
    inboundData.placement = "0.00%";

    response.data.push(inboundData);

    const outboundData = new OutboundPingPostResultDetailsDto();

    outboundData.category = "OUTBOUND";
    outboundData.total_pings = pingData[0].total_outbound_pings || 0;
    outboundData.accepted_pings = `${pingData[0].total_outbound_accepted_pings || 0} (${(pingData[0].total_outbound_accepted_pings / pingData[0].total_outbound_pings * 100).toFixed(2)}%)`;
    outboundData.rejected_pings = pingData[0].total_outbound_rejected_pings || 0;
    outboundData.total_posts = `${postData[0].total_posts || 0} (${(postData[0].total_posts / pingData[0].total_outbound_pings * 100).toFixed(2)}%)`;
    outboundData.accepted_posts = `${postData[0].total_accepted_posts || 0} (${(postData[0].total_accepted_posts / pingData[0].total_outbound_pings * 100).toFixed(2)}%)`;
    outboundData.rejected_posts = `${postData[0].total_rejected_posts || 0} (${(postData[0].total_rejected_posts / pingData[0].total_outbound_pings * 100).toFixed(2)}%)`;
    outboundData.returned_posts = returnsData[0]?.total_returns || 0;
    outboundData.net_leads_delivered = postData[0].total_posts - (returnsData[0]?.total_returns || 0);
    outboundData.placement = "0.00%";

    response.data.push(outboundData);

    const netRevenue = postData[0].total_gross_revenue - (returnsData[0]?.total_returns_revenue || 0);
    const netCost = postData[0].total_vendor_price + returnsData[0]?.total_returns_revenue - (returnsData[0]?.total_returns_revenue || 0);

    response.gross_revenue = `$${(postData[0].total_gross_revenue || 0).toFixed(2)}`;
    response.returned_revenue = `$${(returnsData[0]?.total_returns_revenue || 0).toFixed(2)}`;
    response.net_revenue = `$${(netRevenue || 0).toFixed(2)}`;
    response.total_cost = `$${(postData[0].total_vendor_price + (returnsData[0]?.total_returns_revenue || 0) || 0).toFixed(2)}`;
    response.returned_cost = `$${(returnsData[0]?.total_returns_revenue || 0).toFixed(2)}`;
    response.net_cost = `$${(netCost || 0).toFixed(2)}`;
    response.net_profit = `$${((netRevenue - netCost) || 0).toFixed(2)}`;
    response.avg_revenue_per_lead = `$${((postData[0].total_gross_revenue / postData[0].total_accepted_posts) || 0).toFixed(2)}`;

    const clientData = new OutboundPingPostResultClientDto();

    const vendorNetTotalPayout = postData[0].total_vendor_price - (returnsData[0]?.total_returns_revenue || 0);
    const clientNetTotalPrice = postData[0].total_gross_revenue - (returnsData[0]?.total_returns_revenue || 0);

    clientData.client_id = postData[0].client_id || "";
    clientData.client_name = postData[0].client_name || "";
    clientData.total_leads = postData[0].total_accepted_posts;
    clientData.vendor_payout = `$${(postData[0].total_vendor_price || 0).toFixed(2)}`;
    clientData.total_price = `$${(postData[0].total_gross_revenue || 0).toFixed(2)}`;
    clientData.return_leads = returnsData[0]?.total_returns || 0;
    clientData.return_lead_revenue_lost = `$${(returnsData[0]?.total_returns_revenue || 0).toFixed(2)}`;
    clientData.vendor_net_total_payout = `$${(vendorNetTotalPayout || 0).toFixed(2)}`;
    clientData.client_net_total_price = `$${(clientNetTotalPrice || 0).toFixed(2)}`;
    clientData.client_net_total_leads = postData[0].total_accepted_posts - (returnsData[0]?.total_returns || 0) || 0;
    clientData.net_average = `$${(clientNetTotalPrice / postData[0].total_accepted_posts).toFixed(2)}`;
    clientData.margin = `$${(clientNetTotalPrice - vendorNetTotalPayout || 0).toFixed(2)}`;
    clientData.margin_percent = `${((clientNetTotalPrice - vendorNetTotalPayout) / postData[0].total_gross_revenue * 100 || 0).toFixed(2)}%`;

    response.clients.push(clientData);

    return response;
  }

  async fetchAllSuccessfulPings(params: any, is_archieve: boolean, page_offset: number, page_size: number) {
    return await this.bidModel.aggregate([
      {
        $lookup: {
          from: "incomingrequests",
          localField: "request",
          foreignField: "_id",
          as: "incoming_request"
        }
      },
      {
        $unwind: {
          path: "$incoming_request",
          preserveNullAndEmptyArrays: true
        }
      },
      { $match: params },
      {
        $lookup: {
          from: "users",
          localField: "incoming_request.vendor_id",
          foreignField: "_id",
          as: "incoming_request.vendor"
        }
      },
      {
        $unwind: {
          path: "$incoming_request.vendor",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          vendor_id: "$incoming_request.vendor._id",
          vendor_first_name: "$incoming_request.vendor.first_name",
          vendor_last_name: "$incoming_request.vendor.last_name",
          ping_time: "$incoming_request.ping_time",
          response_time: "$incoming_request.response_time",
          request_payload: "$incoming_request.ping_request_payload",
          response_payload: "$incoming_request.ping_response_payload",
          client_response_payload: 1,
          client_rejection_reason: 1
        }
      },
      {
        $unionWith: {
          coll: "bidarchieves", pipeline: [
            {
              $lookup: {
                from: "incomingarchieverequests",
                localField: "request",
                foreignField: "_id",
                as: "incoming_request"
              }
            },
            {
              $unwind: {
                path: "$incoming_request",
                preserveNullAndEmptyArrays: true
              }
            },
            { $match: params },
            {
              $lookup: {
                from: "users",
                localField: "incoming_request.vendor_id",
                foreignField: "_id",
                as: "incoming_request.vendor"
              }
            },
            {
              $unwind: {
                path: "$incoming_request.vendor",
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $project: {
                _id: 1,
                vendor_id: "$incoming_request.vendor._id",
                vendor_first_name: "$incoming_request.vendor.first_name",
                vendor_last_name: "$incoming_request.vendor.last_name",
                ping_time: "$incoming_request.ping_time",
                response_time: "$incoming_request.response_time",
                request_payload: "$incoming_request.ping_request_payload",
                response_payload: "$incoming_request.ping_response_payload",
                client_response_payload: 1,
                client_rejection_reason: 1
              }
            }
          ]
        }
      },
      { $skip: page_offset * page_size },
      { $limit: page_size }
    ]);
  }

  async fetchAllPostData(params: any, reason, is_archieve: boolean, page_offset: number, page_size: number) {
    return await this.incomingRequestModel.aggregate([
      { $match: params },
      {
        $lookup: {
          from: "users",
          localField: "vendor_id",
          foreignField: "_id",
          as: "vendor"
        }
      },
      {
        $unwind: {
          path: "$vendor",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "leads",
          localField: "_id",
          foreignField: "request",
          as: "lead"
        }
      },
      {
        $unwind: {
          path: "$lead",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          request_type: REQUEST_TYPE.Post, lead_mode: 1,

          $expr: {
            $cond: {
              if: { $eq: [reason, CLIENT_RESPONSE_TYPES.POST_SUCCESSFUL] },
              then: { $ne: [{ $type: "$lead._id" }, "missing"] },
              else: { $eq: [{ $type: "$lead._id" }, "missing"] }
            }
          }
        }
      },
      {
        $project: {
          _id: 1,
          vendor_id: "$vendor._id",
          vendor_first_name: "$vendor.first_name",
          vendor_last_name: "$vendor.last_name",
          ping_time: "$post_time",
          response_time: "$response_time",
          request_payload: "$post_request_payload",
          response_payload: "$post_response_payload",
          client_response_payload: "$post_client_response_payload",
          client_rejection_reason: 1
        }
      },
      {
        $unionWith: {
          coll: "incomingrequestarchieves", pipeline: [
            { $match: params },
            {
              $lookup: {
                from: "users",
                localField: "vendor_id",
                foreignField: "_id",
                as: "vendor"
              }
            },
            {
              $unwind: {
                path: "$vendor",
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $lookup: {
                from: "leads",
                localField: "_id",
                foreignField: "request",
                as: "lead"
              }
            },
            {
              $unwind: {
                path: "$lead",
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $match: {
                request_type: REQUEST_TYPE.Post, lead_mode: 1,

                $expr: {
                  $cond: {
                    if: { $eq: [reason, CLIENT_RESPONSE_TYPES.POST_SUCCESSFUL] },
                    then: { $ne: [{ $type: "$lead._id" }, "missing"] },
                    else: { $eq: [{ $type: "$lead._id" }, "missing"] }
                  }
                }
              }
            },
            {
              $project: {
                _id: 1,
                vendor_id: "$vendor._id",
                vendor_first_name: "$vendor.first_name",
                vendor_last_name: "$vendor.last_name",
                ping_time: "$post_time",
                response_time: "$response_time",
                request_payload: "$post_request_payload",
                response_payload: "$post_response_payload",
                client_response_payload: "$post_client_response_payload",
                client_rejection_reason: 1
              }
            }
          ]
        }
      },
      { $skip: page_offset * page_size },
      { $limit: page_size }
    ]);
  }

  async fetchAllNoByerFoundPings(params: any, is_archieve: boolean, page_offset: number, page_size: number) {
    return await this.incomingRequestModel.aggregate([
      {
        $lookup: {
          from: "bids",
          localField: "request",
          foreignField: "_id",
          as: "bids"
        }
      },
      {
        $unwind: {
          path: "$bids",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $match: {
          $expr: {
            $eq: [{ $type: "$bids._id" }, "missing"]
          }
        }
      },
      { $match: params },
      {
        $lookup: {
          from: "users",
          localField: "vendor_id",
          foreignField: "_id",
          as: "vendor"
        }
      },
      {
        $unwind: {
          path: "$vendor",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          vendor_id: "$vendor._id",
          vendor_first_name: "$vendor.first_name",
          vendor_last_name: "$vendor.last_name",
          ping_time: "$ping_time",
          response_time: "$response_time",
          request_payload: "$ping_request_payload",
          response_payload: "$ping_response_payload",
          client_response_payload: 1,
          client_rejection_reason: 1
        }
      },
      {
        $unionWith: {
          coll: "incomingrequestarchieves", pipeline: [
            {
              $lookup: {
                from: "bidarchieves",
                localField: "request",
                foreignField: "_id",
                as: "bids"
              }
            },
            {
              $unwind: {
                path: "$bids",
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $match: {
                $expr: {
                  $eq: [{ $type: "$bids._id" }, "missing"]
                }
              }
            },
            { $match: params },
            {
              $lookup: {
                from: "users",
                localField: "vendor_id",
                foreignField: "_id",
                as: "vendor"
              }
            },
            {
              $unwind: {
                path: "$vendor",
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $project: {
                _id: 1,
                vendor_id: "$vendor._id",
                vendor_first_name: "$vendor.first_name",
                vendor_last_name: "$vendor.last_name",
                ping_time: "$ping_time",
                response_time: "$response_time",
                request_payload: "$ping_request_payload",
                response_payload: "$ping_response_payload",
                client_response_payload: 1,
                client_rejection_reason: 1
              }
            }
          ]
        }
      },
      { $skip: page_offset * page_size },
      { $limit: page_size }
    ]);
  }

  async fetchRequestsWithReason(params: any, is_archieve: boolean, page_offset: number, page_size: number) {
    return await this.bidModel.aggregate([
      {
        $lookup: {
          from: "incomingrequests",
          localField: "request",
          foreignField: "_id",
          as: "incoming_request"
        }
      },
      {
        $unwind: {
          path: "$incoming_request",
          preserveNullAndEmptyArrays: true
        }
      },
      { $match: params },
      {
        $lookup: {
          from: "users",
          localField: "incoming_request.vendor_id",
          foreignField: "_id",
          as: "incoming_request.vendor"
        }
      },
      {
        $unwind: {
          path: "$incoming_request.vendor",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          vendor_id: "$incoming_request.vendor._id",
          vendor_first_name: "$incoming_request.vendor.first_name",
          vendor_last_name: "$incoming_request.vendor.last_name",
          ping_time: "$incoming_request.ping_time",
          response_time: "$incoming_request.response_time",
          request_payload: "$incoming_request.ping_request_payload",
          response_payload: "$incoming_request.ping_response_payload",
          client_response_payload: 1,
          client_rejection_reason: 1
        }
      },
      { $skip: page_offset * page_size },
      { $limit: page_size }
    ]);
  }

  async fetchRequestsByReason(request: GetRequestsByReasonReportDto): Promise<Bid []> {
    const vendor_id = request.vendor_id;
    const from_date = request.from_date;
    const to_date = request.to_date;
    const reason = request.reason;
    const page_size = request.page_size;
    const page_offset = request.page_offset;

    const startDate = moment(from_date, "YYYY-MM-DD HH:mm:ss").tz(CST_TIMEZONE);
    const endDate = moment(to_date, "YYYY-MM-DD HH:mm:ss").tz(CST_TIMEZONE);

    const isArchieve = moment(startDate).isBefore(moment().tz(CST_TIMEZONE).subtract(1, "day").startOf("day"));

    let allBids = [];

    if (reason === CLIENT_RESPONSE_TYPES.PING_SUCCESSFUL) {
      const params = {
        $and: [{ client_status: RESPONSE_TYPE.Accepted }, {
          "incoming_request.ping_time": {
            $gte: startDate.toDate(),
            $lte: endDate.toDate()
          }
        }, { "incoming_request.vendor_id": new Types.ObjectId(vendor_id) }]
      };
      allBids = await this.fetchAllSuccessfulPings(params, isArchieve, page_offset, page_size);
    } else if (reason === CLIENT_RESPONSE_TYPES.POST_SUCCESSFUL || reason === CLIENT_RESPONSE_TYPES.POST_REJECTED) {
      const params = {
        $and: [{
          post_time: {
            $gte: startDate.toDate(),
            $lte: endDate.toDate()
          }
        }, { vendor_id: new Types.ObjectId(vendor_id) }]
      };
      allBids = await this.fetchAllPostData(params, reason, isArchieve, page_offset, page_size);
    } else if (reason === CLIENT_RESPONSE_TYPES.INTERNAL_NO_BUYER_FOUND) {
      const params = {
        $and: [{
          ping_time: {
            $gte: startDate.toDate(),
            $lte: endDate.toDate()
          }
        }, { vendor_id: new Types.ObjectId(vendor_id) }]
      };
      allBids = await this.fetchAllNoByerFoundPings(params, isArchieve, page_offset, page_size);
    } else {
      const actualReason = reason;
      const params = {
        $and: [{
          client_rejection_reason: {
            $regex: actualReason?.trim(),
            $options: "i"
          }
        }, { client_status: { $ne: RESPONSE_TYPE.Accepted } }, {
          "incoming_request.ping_time": {
            $gte: startDate.toDate(),
            $lte: endDate.toDate()
          }
        }, { "incoming_request.vendor_id": new Types.ObjectId(vendor_id) }]
      };
      allBids = await this.fetchRequestsWithReason(params, isArchieve, page_offset, page_size);
    }

    return allBids;
  }

  async fetchInboundSubReport(body: GetInboundSubReportDto): Promise<InboundReportDto []> {
    const fromDate = body.from_date;
    const toDate = body.to_date;
    const vendorId = body.vendor_id;
    const page_size = body.page_size;
    const page_offset = body.page_offset;

    const reportData = await this.incomingRequestModel.aggregate([
      {
        $match: {
          vendor_id: new Types.ObjectId(vendorId),
          ping_time: {
            $gte: moment(fromDate, "YYYY-MM-DD HH:mm:ss").tz(CST_TIMEZONE).toDate(),
            $lte: moment(toDate, "YYYY-MM-DD HH:mm:ss").tz(CST_TIMEZONE).toDate()
          }
        }
      },
      {
        $lookup: {
          from: "bids",
          localField: "_id",
          foreignField: "request",
          as: "bids"
        }
      },
      {
        $unwind: {
          path: "$bids",
          preserveNullAndEmptyArrays: true
        }
      },
      { $match: { $expr: { $ne: ["$bids.client_status", RESPONSE_TYPE.Accepted] } } },
      { $match: { $expr: { $ne: [{ $type: "$bids.client_rejection_reason" }, "missing"] } } },
      { $match: { $expr: { $ne: ["$bids.client_rejection_reason", "No Buyer Found,"] } } },
      { $match: { $expr: { $ne: ["$bids.client_rejection_reason", "Duplicate Ping,"] } } },
      {
        $lookup: {
          from: "leadtypes",
          localField: "lead_type",
          foreignField: "_id",
          as: "lead_type"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "vendor_id",
          foreignField: "_id",
          as: "vendor"
        }
      },
      {
        $unwind: {
          path: "$vendor",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          _id: 1,
          lead_type: "$lead_type.lead_type",
          vendor_id: "$vendor._id",
          vendor_name: { $concat: ["$vendor.first_name", " ", "$vendor.last_name"] },
          lead_mode: 1,
          request_type: 1,
          client_rejection_reason: "$bids.client_rejection_reason",
          response_time: 1
        }
      },
      {
        $unwind: {
          path: "$lead_type",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$vendor_name",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: {
            lead_type: "$lead_type",
            vendor_id: "$vendor_id",
            vendor_name: "$vendor_name",
            lead_mode: "$lead_mode",
            request_type: "$request_type",
            client_rejection_reason: "$client_rejection_reason"
          },
          count: {
            $sum: 1
          },
          avg: {
            $avg: "$response_time"
          },
          min: {
            $min: "$response_time"
          },
          max: {
            $max: "$response_time"
          }
        }
      },
      {
        $project: {
          _id: 0,
          lead_type: "$_id.lead_type",
          vendor_id: "$_id.vendor_id",
          vendor_name: "$_id.vendor_name",
          lead_mode: "$_id.lead_mode",
          request_type: "$_id.request_type",
          state: "$_id.state",
          client_rejection_reason: "$_id.client_rejection_reason",
          response_time: "$_id.response_time",
          count: "$count",
          min_ping_time: "$min",
          max_ping_time: "$max",
          avg_ping_time: "$avg"
        }
      },
      { $skip: page_offset * page_size },
      { $limit: page_size }
    ]);

    const finalReportData = reportData.map((data, idx) => {
      const error = data.client_rejection_reason.trim();
      const inboundDto = new InboundReportDto();
      inboundDto.rowNo = idx + 1;
      inboundDto.vendor_id = data.vendor_id;
      inboundDto.vendor_name = data.vendor_name;
      inboundDto.lead_type = data.lead_type;
      inboundDto.error = error;
      inboundDto.count = data.count;
      inboundDto.min_ping_time = data.min_ping_time || 0;
      inboundDto.max_ping_time = data.max_ping_time || 0;
      inboundDto.avg_ping_time = data.avg_ping_time || 0;
      return inboundDto;
    });

    return finalReportData;
  }

  async fetchRevenueMatrixReport(body: GetRevenueMatrixReportDto): Promise<RevenueMatrixResponseDto> {

    const response = new RevenueMatrixResponseDto();

    const startDate = moment.utc(body.start_date, "YYYY-MM-DD").startOf("day").toDate();
    const endDate = moment.utc(body.end_date, "YYYY-MM-DD").endOf("day").toDate();
    const leadType = body.lead_type.toString();

    const filterParams = {
      start_time: { $gte: startDate },
      end_time: { $lte: endDate }
    };

    if (leadType !== "all") {
      filterParams["lead_type"] = parseInt(leadType);
    }

    // Query to get all the posts within the requested date range
    const allPosts = await this.postModel.aggregate([
      {
        // Get all buckets within the date range
        $match: {
          ...filterParams
        }
      },
      {
        // Keep only specific properties of the data fetched
        $project: {
          start_time: 1,
          end_time: 1,
          leads: 1,
          reasons: 1,
          // Get the number of leads in leads []
          no_of_leads: { $size: "$leads" },
          lead_type: 1
        }
      },
      {
        $match: {
          // Keep only records where leads is greater than 0
          no_of_leads: { $gt: 0 }
        }
      },
      {
        // Create a new property "client_returns" which is an array of
        // returned leads matched from clientreturns collection
        $lookup: {
          from: "clientreturns",
          localField: "leads",
          foreignField: "lead",
          as: "client_returns"
        }
      },
      {
        // Unwind all the client_returns
        $unwind: {
          path: "$client_returns",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        // Projected once again to just include the vendor price of the
        // client returns.
        $project: {
          _id: 0,
          leads: "$leads",
          lead_date: {
            $dateToString: {
              date: "$start_time",
              format: "%Y-%m-%d"
            }
          },
          total_client_price: "$reasons.post_accepted.total_client_price",
          total_vendor_price: "$reasons.post_accepted.total_vendor_price",
          total_revenue_share: "$reasons.post_accepted.total_revenue_share",
          total_client_returns: "$client_returns.client_price",
          total_vendor_returns: "$client_returns.vendor_price",
          lead_type: 1
        }
      },
      {
        // Group All the data based on per day basis and create a sum of
        // each price property in the group
        $group: {
          _id: "$lead_date",
          leads: { $push: "$leads" },
          total_client_price: { $sum: "$total_client_price" },
          total_vendor_price: { $sum: "$total_vendor_price" },
          total_revenue_share: { $sum: "$total_revenue_share" },
          total_client_returns: { $sum: "$total_client_returns" },
          total_vendor_returns: { $sum: "$total_vendor_returns" }
        }
      },
      {
        $setWindowFields: {
          partitionBy: "$lead_date",
          sortBy: { total_client_price: 1 },
          output: {
            // Creates a property called max_client_price which is the
            // best day price in the overall collection
            max_client_price: {
              $max: "$total_client_price",
              window: {
                documents: ["unbounded", "unbounded"]
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          //  Picking the date from the previous aggregation
          lead_date: "$_id",
          total_client_price: { $round: ["$total_client_price", 2] },
          total_client_returns: { $round: ["$total_client_returns", 2] },
          total_net_revenue_after_returns: { $round: [{ $subtract: ["$total_client_price", "$total_client_returns"] }, 2] },
          total_vendor_price: { $round: ["$total_vendor_price", 2] },
          total_commission: { $round: [{ $subtract: ["$total_vendor_price", "$total_vendor_returns"] }, 2] }, //$total_revenue_share (previous bug)
          total_net_profit: { $round: [{ $subtract: [{ $subtract: ["$total_client_price", { $subtract: ["$total_vendor_price", "$total_vendor_returns"] }] }, "$total_client_returns"] }, 2] },
          // Removes duplicate leads from the array of leads
          leads: {
            $reduce: {
              input: "$leads",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] }
            }
          },
          // Checking if its the best day or not
          is_best: { $cond: [{ $eq: ["$total_client_price", "$max_client_price"] }, true, false] },
          color: {
            $switch: {
              branches: [
                // Assign yellow color to best day
                {
                  case: { $eq: ["$total_client_price", "$max_client_price"] },
                  then: YELLOW_COLOR
                },
                // Assign the Blue color if the day of the week is the same day
                {
                  case: {
                    $eq: [{
                      $dayOfWeek: {
                        $dateFromString: {
                          dateString: "$_id",
                          format: "%Y-%m-%d"
                        }
                      }
                    }, { $dayOfWeek: moment().toDate() }]
                  }, then: BLUE_COLOR
                }
              ], default: ""
            }
          }
        }
      },
      // Final project and preparation of data
      {
        $project: {
          lead_date: { $concat: ["$lead_date", " ", "00:00"] },
          // Lead_date_instance is the timestamp of the current moment at
          // which
          lead_date_instance: {
            $concat: ["$lead_date", " ", {
              $dateToString: {
                format: "%H:%M:%S",
                date: moment().toDate()
              }
            }]
          },
          total_client_price: "$total_client_price",
          total_client_returns: "$total_client_returns",
          total_net_revenue_after_returns: "$total_net_revenue_after_returns",
          total_vendor_price: "$total_vendor_price",
          total_commission: "$total_commission",
          total_net_profit: "$total_net_profit",
          // Calculating percentage profit
          total_percentage: { $multiply: [{ $divide: ["$total_net_profit", "$total_net_revenue_after_returns"] }, 100] },
          leads: "$leads",
          is_best: "$is_best",
          color: "$color"
        }
      },
      {
        $sort: { lead_date: 1 }
      }
    ]);


    // Filter out the bestDay from all data
    const bestDayFilterData = filter(allPosts, { is_best: true })[0];

    // Creating a query for fetching the best day details from the database
    const bestDataFilters = [
      {
        // Strat by selecting the fields needed
        $project: {
          start_time: 1,
          end_time: 1,
          leads: 1,
          reasons: 1,
          // Number of leads simple counts the total leads in the array
          no_of_leads: { $size: "$leads" }
        }
      },
      {
        // Remove all the entries where leads is less than 1
        $match: {
          no_of_leads: { $gt: 0 }
        }
      },
      {
        // Project new properties related to the price
        $project: {
          total_client_price: "$reasons.post_accepted.total_client_price",
          total_vendor_price: "$reasons.post_accepted.total_vendor_price",
          total_revenue_share: "$reasons.post_accepted.total_revenue_share",
          total_client_returns: "$client_returns.client_price",
          total_vendor_returns: "$client_returns.vendor_price"
        }
      },
      {
        // Since its a single day match groups everything together
        $group: {
          _id: null,
          total_client_price: { $sum: "$total_client_price" },
          total_vendor_price: { $sum: "$total_vendor_price" },
          total_revenue_share: { $sum: "$total_revenue_share" },
          total_client_returns: { $sum: "$total_client_returns" },
          total_vendor_returns: { $sum: "$total_vendor_returns" }
        }
      },
      {
        // Rounding off the numbers related to price
        $project: {
          _id: 0,
          total_client_price: { $round: ["$total_client_price", 2] },
          total_vendor_price: { $round: ["$total_vendor_price", 2] },
          total_revenue_share: { $round: ["$total_revenue_share", 2] },
          total_client_returns: { $round: ["$total_client_returns", 2] },
          total_vendor_returns: { $round: ["$total_vendor_returns", 2] }
        }
      }
    ];

    // Get the best day data from the database
    const bestDayDataSet = bestDayFilterData?.lead_date ? await this.postModel.aggregate([
      {
        $match: {
          start_time: {
            $gte: moment.utc(bestDayFilterData.lead_date, "YYYY-MM-DD HH:mm").toDate(),
            $lte: moment.utc(bestDayFilterData.lead_date_instance, "YYYY-MM-DD HH:mm:ss").toDate()
          }
        }
      },
      ...bestDataFilters
    ]) : [];
    // best day is working properly now

    // Starting to prepare response for all days
    let row_no = 1;

    response.normal_day_data = allPosts.map((post) => {
      const mainDay = new RevenueMatrixMainDayResponseDto();
      mainDay.row_no = row_no;
      mainDay.date = moment(post.lead_date, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD ddd");
      mainDay.total_gross_revenue = `$${post.total_client_price.toFixed(2)}`;
      mainDay.total_returns_received = `$${post.total_client_returns.toFixed(2)}`;
      mainDay.net_revenue_after_returns = `$${round(post.total_net_revenue_after_returns, 2).toFixed(2)}`;
      mainDay.total_commission = `$${post.total_vendor_price.toFixed(2)}`;
      mainDay.total_net_profit = `$${post.total_net_profit.toFixed(2)}`;
      mainDay.total_percentage = `${round(post.total_percentage, 2).toFixed(2)}%`;
      mainDay.is_best = post.is_best;
      mainDay.row_class = post.color;
      row_no += 1;
      return mainDay;
    });

    // Calculating the Total Net Profit Row
    const totalNetProfit = sumBy(allPosts, (post) => post.total_net_profit);
    // Calculating the Gross Revenue Row
    const totalGrossRevenue = sumBy(allPosts, (post) => post.total_client_price);

    // Adding the main data summary row to the response
    response.main_data_summary = new RevenueMatrixMainSummaryResponseDto();
    response.main_data_summary.row_no = row_no;
    response.main_data_summary.total_gross_revenue = `$${totalGrossRevenue.toFixed(2)}`;
    response.main_data_summary.total_returns_received = `$${sumBy(allPosts, (post) => post.total_client_returns).toFixed(2)}`;
    response.main_data_summary.net_revenue_after_returns = `$${sumBy(allPosts, (post) => post.total_net_revenue_after_returns).toFixed(2)}`;
    response.main_data_summary.total_commission = `$${sumBy(allPosts, (post) => post.total_vendor_price).toFixed(2)}`;
    response.main_data_summary.total_net_profit = `$${totalNetProfit.toFixed(2)}`;
    response.main_data_summary.total_percentage = `${round((totalNetProfit / totalGrossRevenue) * 100, 2).toFixed(2)}%`;


    // Extract the best day data as a single from an array  object and if the
    // data does not exit set a new object with all propeties value set to 0
    const bestDayData = bestDayDataSet?.length > 0 ? bestDayDataSet[0] : {
      total_client_price: 0,
      total_vendor_price: 0,
      total_revenue_share: 0,
      total_client_returns: 0,
      total_vendor_returns: 0
    };


    // Calculate the difference in revenue on best day
    const bestDayGrossRevenueDiff = allPosts[allPosts.length - 1]?.total_client_price - bestDayData.total_client_price || 0;
    // Calculate the difference in commission on best day
    const commissionDiff = allPosts[allPosts.length - 1]?.total_commission ? round(allPosts[allPosts.length - 1]?.total_commission - (bestDayData.total_vendor_price - bestDayData.total_vendor_returns), 2) : 0;
    // Calculate the difference in net revenue
    const netRevenueAfterReturns = round(bestDayData.total_client_price - bestDayData.total_client_returns, 2);



    row_no += 1;
    response.best_day_data = new RevenueMatrixMainDayResponseDto();
    response.best_day_data.row_no = row_no;
    response.best_day_data.date = `Best day @ ${moment(bestDayFilterData?.lead_date_instance, "YYYY-MM-DD HH:mm:ss").format("HH:mm:ss")}`;
    response.best_day_data.total_gross_revenue = `$${bestDayData.total_client_price.toFixed(2)}`;
    response.best_day_data.total_gross_revenue_diff = `$${bestDayGrossRevenueDiff?.toFixed(2)}`;
    response.best_day_data.total_gross_revenue_show_up_arrow = bestDayGrossRevenueDiff >= 0 ? true : false;
    response.best_day_data.total_commission = `$${(bestDayData.total_vendor_price - bestDayData.total_vendor_returns).toFixed(2)}`;
    response.best_day_data.total_commission_diff = `$${commissionDiff.toFixed(2)}`;
    response.best_day_data.total_commission_show_up_arrow = commissionDiff >= 0 ? true : false;
    response.best_day_data.total_returns_received = `$${bestDayData.total_client_returns.toFixed(2)}`;
    response.best_day_data.net_revenue_after_returns = `$${netRevenueAfterReturns.toFixed(2)}`;
    response.best_day_data.net_revenue_after_returns_diff = `$${netRevenueAfterReturns.toFixed(2)}`;
    response.best_day_data.net_revenue_after_returns_show_up_arrow = netRevenueAfterReturns >= 0 ? true : false;
    response.best_day_data.total_net_profit = `$${round(bestDayData.total_client_price - bestDayData.total_client_returns - (bestDayData.total_vendor_price - bestDayData.total_vendor_returns), 2).toFixed(2) || 0}`;
    response.best_day_data.total_percentage = `${round(((bestDayData.total_client_price - bestDayData.total_client_returns - (bestDayData.total_vendor_price - bestDayData.total_vendor_returns)) / bestDayData.total_client_price) * 100 || 0, 2).toFixed(2) || 0}%`;
    response.best_day_data.row_class = bestDayGrossRevenueDiff >= 0 ? GREEN_COLOR : RED_COLOR;



    // Calculating the last same day in UTC
    const lastSameDay = moment.utc(body.end_date, "YYYY-MM-DD").subtract(7, "days").startOf("day").format("YYYY-MM-DD HH:mm");

    // Extract the last same data from posts
    const lastSameDayFilterData = filter(allPosts, { lead_date: lastSameDay })[0];

    // Getting the last same day data from the database
    const lastSameDayDataSet = lastSameDayFilterData ? await this.postModel.aggregate([
      {
        $match: {
          start_time: {
            $gte: moment.utc(lastSameDayFilterData.lead_date, "YYYY-MM-DD HH:mm").toDate(),
            $lte: moment.utc(lastSameDayFilterData.lead_date_instance, "YYYY-MM-DD HH:mm:ss").toDate()
          }
        }
      },
      ...bestDataFilters
    ]) : [];

    // Extract the object from the array for last same day data
    const lastSameDayData = lastSameDayDataSet?.length > 0 ? lastSameDayDataSet[0] : {
      total_client_price: 0,
      total_vendor_price: 0,
      total_revenue_share: 0,
      total_client_returns: 0,
      total_vendor_returns: 0
    };


    // Calculating last same day gross revenue difference
    const lastSameDayGrossRevenueDiff = allPosts[allPosts.length - 1]?.total_client_price - lastSameDayData.total_client_price || 0;
    // Calculating last same day commission difference
    const lastSameDayCommissionDiff = allPosts[allPosts.length - 1]?.total_commission ? round(allPosts[allPosts.length - 1]?.total_commission - (lastSameDayData.total_vendor_price - lastSameDayData.total_vendor_returns), 2) : 0;
    // Calculating last same day net reevenue difference
    const lastSameDayNetRevenueAfterReturns = round(lastSameDayData.total_client_price - lastSameDayData.total_client_returns, 2);

    // Adding last same day to response
    row_no += 1;
    response.last_same_day_data = new RevenueMatrixMainDayResponseDto();
    response.last_same_day_data.row_no = row_no;
    response.last_same_day_data.date = lastSameDayFilterData?.lead_date_instance ? `Last ${moment(lastSameDayFilterData?.lead_date_instance, "YYYY-MM-DD HH:mm:ss").format("dddd YYYY-MM-DD @ HH:mm:ss")}` : "";
    response.last_same_day_data.total_gross_revenue = `$${lastSameDayData.total_client_price.toFixed(2)}`;
    response.last_same_day_data.total_gross_revenue_diff = `$${lastSameDayGrossRevenueDiff?.toFixed(2)}`;
    response.last_same_day_data.total_gross_revenue_show_up_arrow = lastSameDayGrossRevenueDiff >= 0 ? true : false;
    response.last_same_day_data.total_commission = `$${(lastSameDayData.total_vendor_price - lastSameDayData.total_vendor_returns).toFixed(2)}`;
    response.last_same_day_data.total_commission_diff = `$${lastSameDayCommissionDiff.toFixed(2)}`;
    response.last_same_day_data.total_commission_show_up_arrow = lastSameDayCommissionDiff >= 0 ? true : false;
    response.last_same_day_data.total_returns_received = `$${lastSameDayData.total_client_returns.toFixed(2)}`;
    response.last_same_day_data.net_revenue_after_returns = `$${lastSameDayNetRevenueAfterReturns.toFixed(2)}`;
    response.last_same_day_data.net_revenue_after_returns_diff = `$${netRevenueAfterReturns.toFixed(2)}`;
    response.last_same_day_data.net_revenue_after_returns_show_up_arrow = netRevenueAfterReturns >= 0 ? true : false;
    response.last_same_day_data.total_net_profit = `$${round(lastSameDayData.total_client_price - (lastSameDayData.total_vendor_price - lastSameDayData.total_vendor_returns) - lastSameDayData.total_client_returns, 2)?.toFixed(2) || 0}`;
    response.last_same_day_data.total_percentage = `${(lastSameDayData.total_client_price > 0 ? round(((lastSameDayData.total_client_price - (lastSameDayData.total_vendor_price - lastSameDayData.total_vendor_returns) - lastSameDayData.total_client_returns) / lastSameDayData.total_client_price) * 100, 2) : 0).toFixed(2)}%`;
    response.last_same_day_data.row_class = lastSameDayGrossRevenueDiff >= 0 ? GREEN_COLOR : RED_COLOR;

    // Calculate the average sale per day till today - sales till today
    // divided by total number of days
    const average = sumBy(allPosts, (post) => post.total_client_price) / response.normal_day_data.length;

    // Adding daily average to response
    response.daily_average = `$${(!isNaN(average) ? average : 0).toFixed(2)}`;
    // Adding monthly forecast to response
    response.month_forecast = `$${(!isNaN(average) ? average * 30 : 0).toFixed(2)}`;

    /*
    * Code to fetch the lead types from the database
    * */
    response.lead_types = [];

    // Create a leadTypeInfo object
    const leadTypeInfo = new LeadTypeDto();

    // Only Extracting Auto Insurance to leadTypeInfo
    const autoInsuranceLeadType = filter(LEAD_TYPES, { value: 5 })[0];

    // Adding the fetched value from constant to leadTypeInfo
    leadTypeInfo.lead_type = autoInsuranceLeadType.value;
    leadTypeInfo.label = autoInsuranceLeadType.label;

    // adding the leadTypeInfo to response object
    response.lead_types.push(leadTypeInfo);

    /*
    * This is incorrect for longer run
    * This right now only shows data for Auto Insurance assuming that
    * there is only one vertical in the entire system.
    * So uses the totals of the main data in the Auto Insurance
    * Specific data vertical
    * */
    response.lead_type_data = {
      [autoInsuranceLeadType.value]: {
        normal_day_data: response.normal_day_data,
        best_day_data: response.best_day_data,
        last_same_day_data: response.last_same_day_data,
        lead_data_summary: response.main_data_summary
      }
    };

    // Condition to set display_comparison to true or false
    if (moment(body.end_date, "YYYY-MM-DD").isSame(moment(), "day") || moment(body.end_date, "YYYY-MM-DD").isAfter(moment(), "day")) {
      response.display_comparison = true;
    } else {
      response.display_comparison = false;
    }

    // tz(CST_TIMEZONE)
    response.last_updated = moment().utc().format("YYYY-MM-DD HH:mm:ss");

    return response;
  }

  async fetchInboundReport(body: GetInboundReportDto): Promise<InboundReportDto []> {
    const params = {
      request_type: body.request_type === "ping" ? REQUEST_TYPE.Ping : REQUEST_TYPE.Post,
      lead_mode: body.lead_mode
    };

    const startDate = moment(body.start_date, "YYYY-MM-DD HH:mm:ss").tz(CST_TIMEZONE);
    const endDate = moment(body.end_date, "YYYY-MM-DD HH:mm:ss").tz(CST_TIMEZONE);

    if (body.request_type === "ping") {
      params["ping_time"] = {
        $gte: startDate.toDate(),
        $lte: endDate.toDate()
      };
    } else {
      params["post_time"] = {
        $gte: startDate.toDate(),
        $lte: endDate.toDate()
      };
    }

    if (body.vendor_id.length > 0) {
      params["vendor_id"] = new Types.ObjectId(body.vendor_id);
    }

    let reportData = [];

    if (body.request_type === "ping") {
      reportData = await this.incomingRequestModel.aggregate([
        { $match: params },
        {
          $lookup: {
            from: "bids",
            localField: "_id",
            foreignField: "request",
            as: "bids"
          }
        },
        {
          $lookup: {
            from: "leadtypes",
            localField: "lead_type",
            foreignField: "_id",
            as: "lead_type"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "vendor_id",
            foreignField: "_id",
            as: "vendor"
          }
        },
        {
          $unwind: {
            path: "$vendor",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $unwind: {
            path: "$bids",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            _id: 1,
            lead_type: "$lead_type.lead_type",
            vendor_id: "$vendor._id",
            vendor_name: { $concat: ["$vendor.first_name", " ", "$vendor.last_name"] },
            client_rejection_reason: {
              $switch: {
                branches: [
                  {
                    case: { $eq: [{ $type: "$bids.client_rejection_reason" }, "missing"] },
                    then: "Internal No buyer found"
                  },
                  {
                    case: { $eq: ["$bids.client_rejection_reason", "No Buyer Found,"] },
                    then: "No Buyer Found"
                  },
                  {
                    case: { $eq: ["$bids.client_rejection_reason", "Duplicate Ping,"] },
                    then: "Duplicate Ping"
                  },
                  {
                    case: { $eq: ["$bids.client_rejection_reason", ""] },
                    then: `${body.request_type === "ping" ? "Ping" : "Post"} Successful`
                  }
                ], default: "Errors Detected"
              }
            },
            client_status: { $ifNull: ["$bids.client_status", "Rejected"] },
            response_time: { $ifNull: ["$response_time", 0] }
          }
        },
        {
          $group: {
            _id: {
              lead_type: "$lead_type",
              vendor_id: "$vendor_id",
              vendor_name: "$vendor_name",
              client_status: "$client_status",
              client_rejection_reason: "$client_rejection_reason"
            },
            count: {
              $sum: 1
            },
            avg: {
              $avg: "$response_time"
            },
            min: {
              $min: "$response_time"
            },
            max: {
              $max: "$response_time"
            }
          }
        },
        {
          $project: {
            _id: 0,
            lead_type: "$_id.lead_type",
            vendor_id: "$_id.vendor_id",
            vendor_name: "$_id.vendor_name",
            client_status: "$_id.client_status",
            client_rejection_reason: "$_id.client_rejection_reason",
            count: "$count",
            min_ping_time: "$min",
            max_ping_time: "$max",
            avg_ping_time: "$avg"
          }
        }
      ]);
    } else {
      reportData = await this.incomingRequestModel.aggregate([
        { $match: params },
        {
          $lookup: {
            from: "leads",
            localField: "_id",
            foreignField: "request",
            as: "lead"
          }
        },
        {
          $lookup: {
            from: "leadtypes",
            localField: "lead_type",
            foreignField: "_id",
            as: "lead_type"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "vendor_id",
            foreignField: "_id",
            as: "vendor"
          }
        },
        {
          $unwind: {
            path: "$vendor",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $unwind: {
            path: "$lead",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            _id: 1,
            lead_type: "$lead_type.lead_type",
            vendor_id: "$vendor._id",
            vendor_name: { $concat: ["$vendor.first_name", " ", "$vendor.last_name"] },
            client_rejection_reason: {
              $switch: {
                branches: [
                  {
                    case: { $ne: [{ $type: "$lead._id" }, "missing"] },
                    then: CLIENT_RESPONSE_TYPES.POST_SUCCESSFUL
                  }
                ], default: CLIENT_RESPONSE_TYPES.POST_REJECTED
              }
            },
            client_status: {
              $switch: {
                branches: [
                  {
                    case: { $ne: [{ $type: "$lead._id" }, "missing"] },
                    then: CLIENT_RESPONSE_TYPES.POST_SUCCESSFUL
                  }
                ], default: CLIENT_RESPONSE_TYPES.POST_REJECTED
              }
            },
            response_time: { $ifNull: ["$response_time", 0] }
          }
        },
        {
          $group: {
            _id: {
              lead_type: "$lead_type",
              vendor_id: "$vendor_id",
              vendor_name: "$vendor_name",
              client_status: "$client_status",
              client_rejection_reason: "$client_rejection_reason"
            },
            count: {
              $sum: 1
            },
            avg: {
              $avg: "$response_time"
            },
            min: {
              $min: "$response_time"
            },
            max: {
              $max: "$response_time"
            }
          }
        },
        {
          $project: {
            _id: 0,
            lead_type: "$_id.lead_type",
            vendor_id: "$_id.vendor_id",
            vendor_name: "$_id.vendor_name",
            client_status: "$_id.client_status",
            client_rejection_reason: "$_id.client_rejection_reason",
            count: "$count",
            min_ping_time: "$min",
            max_ping_time: "$max",
            avg_ping_time: "$avg"
          }
        }
      ]);
    }

    const finalReportData = reportData.map((data, idx) => {
      const inboundDto = new InboundReportDto();
      inboundDto.rowNo = idx + 1;
      inboundDto.vendor_id = data.vendor_id;
      inboundDto.vendor_name = data.vendor_name;
      inboundDto.lead_type = data.lead_type;
      inboundDto.error = data.client_rejection_reason;
      inboundDto.count = data.count;
      inboundDto.min_ping_time = data.min_ping_time || 0;
      inboundDto.max_ping_time = data.max_ping_time || 0;
      inboundDto.avg_ping_time = data.avg_ping_time || 0;
      return inboundDto;
    });

    return finalReportData;
  }

  async fetchKPISummaryForUser(user_id: string): Promise<KPISummaryResponseDto> {

    const user = await this.userModel.findById(user_id)
      .populate("role")
      .exec();

    const leadTypes = await this.leadTypeModel.find({}).exec();

    const kpiData = new KPISummaryResponseDto();

    kpiData.data = [];

    const oldRecord = await this.incomingRequestModel.findOne({}, {}, { sort: { "ping_time": -1 } }).exec();

    kpiData.start_date = oldRecord?.ping_time ? moment(oldRecord.ping_time).tz(CST_TIMEZONE).format("MMM Do YYYY HH:mm:ss") : moment().tz(CST_TIMEZONE).format("MMM Do YYYY HH:mm:ss");

    await Promise.all(leadTypes.map(async (lead_type) => {
      const kpiSummary = new KPISummaryDto();
      kpiSummary.lead_type = lead_type.lead_type;

      let totalPingsForLead: any = [{ count: 0 }];
      let totalPingsSent: any = [{ count: 0 }];
      let totalPingsSentForBids: any = [{ count: 0 }];
      let totalPostsForLead: any = [{ count: 0 }];
      let totalPostsSent: any = [{ count: 0 }];
      let totalPostsAccepted: any = [{ count: 0 }];
      let totalBids: any = [{ count: 0 }];
      let totalRevenueCalc: any = [];


      if (user.role.name === USER_TYPES.ADMIN && lead_type.lead_type_id === LEAD_TYPES_ENUM.AUTO_INSURANCE) {
        totalPingsForLead = await this.autoInsurancePingModel.find().exec();
        totalPingsSent = await this.autoInsuranceOutPingModel.find().exec();
        totalPingsSentForBids = await this.autoInsurancePingsForBidModel.find().exec();
        totalPostsForLead = await this.autoInsurancePostModel.find().exec();
        totalPostsSent = await this.autoInsuranceOutPostModel.find().exec();
        totalPostsAccepted = await this.autoInsuranceAcceptedPostModel.find().exec();
        totalBids = await this.autoInsuranceBidModel.find().exec();
        totalRevenueCalc = await this.autoInsuranceKPIRevenueDetailModel.find().exec();
      }

      kpiSummary.no_of_pings_received = totalPingsForLead?.length > 0 ? totalPingsForLead[0]?.count : 0;

      kpiSummary.no_of_pings_sent = totalPingsSent?.length > 0 ? totalPingsSent[0].count : 0;

      kpiSummary.pings_in_bid_on = totalPingsSentForBids?.length > 0 ? totalPingsSentForBids[0].count : 0;

      kpiSummary.no_of_posts_in = totalPostsForLead?.length > 0 ? totalPostsForLead[0].count : 0;

      kpiSummary.no_of_posts_out = totalPostsSent?.length > 0 ? totalPostsSent[0].count : 0;

      kpiSummary.no_of_posts_accepted = totalPostsAccepted?.length > 0 ? totalPostsAccepted[0].count : 0;

      kpiSummary.pings_out_bid_on = totalBids?.length > 0 ? totalBids[0].count : 0;

      //const totalRevenue = totalRevenueCalc[0].revenue_share;
      const totalCommision = totalRevenueCalc?.length > 0 ? totalRevenueCalc[0].vendor_price : 0;
      const totalClientPrice = totalRevenueCalc?.length > 0 ? totalRevenueCalc[0].client_price : 0;

      kpiSummary.revenue = totalClientPrice;
      kpiSummary.commission = totalCommision;
      kpiSummary.net_profit = totalClientPrice - totalCommision;
      kpiSummary.profit_percent = kpiSummary.net_profit / totalClientPrice * 100 || 0;

      kpiData.data.push(kpiSummary);

      return lead_type;
    }));

    return kpiData;
  }


}
