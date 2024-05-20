import { Model } from "mongoose";
import {
  BidDocument,
  LeadTypeDocument,
  IncomingRequestDocument
} from "./schemas";
import {
  CampaignDocument,
} from "../../campaigns/schemas";
import { UserDocument } from "../../users/schemas";
import { REQUEST_TYPE } from '../../config/constants';

export class Helpers {
  incomingRequestModel: Model<IncomingRequestDocument>;
  leadTypeModel: Model<LeadTypeDocument>;
  campaignModel: Model<CampaignDocument>;
  userModel: Model<UserDocument>;
  bidModel: Model<BidDocument>;

  public async clearAllData () {
    await this.incomingRequestModel.deleteMany({});
    await this.leadTypeModel.deleteMany({});
    await this.campaignModel.deleteMany({});
    await this.userModel.deleteMany({});
    await this.bidModel.deleteMany({});
  }

  public async clearRequestData() {
    await this.incomingRequestModel.deleteMany({});
  }

  public async fetchLatestPingId() {
    const request =  await this.incomingRequestModel
      .findOne({ request_type: REQUEST_TYPE.Ping })
      .exec();

    return request._id.toString();
  }

  public async deletePostRequests() {
    await this.incomingRequestModel.deleteMany({ request_type: REQUEST_TYPE.Post })
  }

  public async fetchLatestPostId() {
    const request =  await this.incomingRequestModel
      .findOne({ request_type: REQUEST_TYPE.Post })
      .exec();

    return request._id.toString();
  }

  public async addLeadType (leadType) {
    return await this.leadTypeModel.create(leadType);
  }

  public async addCampaign (campaignData) {
    return await this.campaignModel.create(campaignData);
  }

  public async addUser (userData) {
    return  await this.userModel.create(userData);
  }

  public async fetchLatestRequest () {
    return await this.incomingRequestModel.findOne({})
      .sort({ date: -1 })
      .populate({ path: 'fields' })
      .populate({ path: 'lead_type' })
      .populate({ path: 'vendor' })
      .exec();
  }

}



