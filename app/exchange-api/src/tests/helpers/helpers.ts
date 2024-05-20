import { Model } from "mongoose";
import {
  Bid,
  BidDocument, LeadType,
  LeadTypeDocument, IncomingRequest,
  IncomingRequestDocument,
} from "../../verticals/autoinsurance/schemas";
import {
  Campaign,
  CampaignDocument
} from "../../campaigns/schemas";
import {
  Role,
  RoleDocument,
  Permission,
  PermissionDocument,
  Entity,
  EntityDocument
} from "../../auth/schemas";
import { User, UserDocument } from "../../users/schemas";
import { getModelToken } from "@nestjs/mongoose";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { REQUEST_TYPE } from '../../config/constants';

export class Helpers {
  incomingRequestModel: Model<IncomingRequestDocument>;
  leadTypeModel: Model<LeadTypeDocument>;
  campaignModel: Model<CampaignDocument>;
  userModel: Model<UserDocument>;
  bidModel: Model<BidDocument>;
  roleModel: Model<RoleDocument>;
  permissionModel: Model<PermissionDocument>;
  entityModel: Model<EntityDocument>;
  app: INestApplication;

  constructor(app: INestApplication) {
    this.app = app;
    this.incomingRequestModel = app.get<Model<IncomingRequestDocument>>(getModelToken(IncomingRequest.name));
    this.leadTypeModel = app.get<Model<LeadTypeDocument>>(getModelToken(LeadType.name));
    this.campaignModel = app.get<Model<CampaignDocument>>(getModelToken(Campaign.name));
    this.userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
    this.bidModel = app.get<Model<BidDocument>>(getModelToken(Bid.name));
    this.roleModel = app.get<Model<RoleDocument>>(getModelToken(Role.name));
    this.permissionModel = app.get<Model<PermissionDocument>>(getModelToken(Permission.name));
    this.entityModel = app.get<Model<EntityDocument>>(getModelToken(Entity.name));
  }

  public async clearAllData () {
    await this.incomingRequestModel.deleteMany({});
    await this.leadTypeModel.deleteMany({});
     await this.campaignModel.deleteMany({});
    await this.userModel.deleteMany({});
    await this.bidModel.deleteMany({});
  }

  public async clearAllVendorData() {
    await this.entityModel.deleteMany({});
    await this.permissionModel.deleteMany({});
    await this.roleModel.deleteMany({});
    await this.leadTypeModel.deleteMany({});
    await this.userModel.deleteMany({});
  }

  public async clearAllClientData() {
    await this.entityModel.deleteMany({});
    await this.permissionModel.deleteMany({});
    await this.roleModel.deleteMany({});
    await this.leadTypeModel.deleteMany({});
    await this.userModel.deleteMany({});
  }

  public async clearAllCampaignData() {
    await this.entityModel.deleteMany({});
    await this.permissionModel.deleteMany({});
    await this.roleModel.deleteMany({});
    await this.leadTypeModel.deleteMany({});
    await this.userModel.deleteMany({});
    await this.campaignModel.deleteMany({});
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

  public async fetchNewlyAddedCampaign() {
    return await this.campaignModel.findOne({}).exec();
  }

  public async addEntities(entities) {
    return await this.entityModel.insertMany(entities);
  }

  public async addPermissions(permissions) {
    return await this.permissionModel.insertMany(permissions);
  }
  public async addRoles(roles) {
    return await this.roleModel.insertMany(roles);
  }

  public async updateRoleForUser(id, role) {
    return await this.userModel.findByIdAndUpdate(id, { $set: { role } }, { new: true }).exec();
  }

  public async callPingAPI(pingRequest) {
    return await request(this.app.getHttpServer())
      .post('/leads/ping')
      .set('Content-Type', 'application/json')
      .set('wait-time', '5')
      .send({
        ...pingRequest,
      });
  }

  public async callPostAPI(postRequest) {
    return await request(this.app.getHttpServer())
      .post('/leads/post')
      .set('Content-Type', 'application/json')
      .set('wait-time', '10')
      .send({
        ...postRequest,
      });
  }

  public async callBidAPI(bidRequest) {
    return await request(this.app.getHttpServer())
      .post('/leads/bid')
      .set('Content-Type', 'application/json')
      .send({
        ...bidRequest,
      });
  }

  public async callLeadAPI(leadRequest) {
    return await request(this.app.getHttpServer())
      .post('/leads/lead')
      .set('Content-Type', 'application/json')
      .send({
        ...leadRequest,
      });
  }

  public async callAddVendorAPI(addVendorRequest) {
    return await request(this.app.getHttpServer())
      .post('/vendors')
      .set('Content-Type', 'application/json')
      .send({
        ...addVendorRequest,
      });
  }

  public async callUpdateVendorAPI(vendor_id, updateVendorRequest) {
    return await request(this.app.getHttpServer())
      .patch(`/vendors/${vendor_id}`)
      .set('Content-Type', 'application/json')
      .send({
        ...updateVendorRequest,
      });
  }

  public async callDeleteVendorAPI(deleteRequest) {
    return await request(this.app.getHttpServer())
      .post(`/vendors/${deleteRequest.vendor_id}`)
      .set('Content-Type', 'application/json')
      .send({
        user_id: deleteRequest.user_id
      });
  }

  public async callAddClientAPI(addClientRequest) {
    return await request(this.app.getHttpServer())
      .post('/clients')
      .set('Content-Type', 'application/json')
      .send({
        ...addClientRequest,
      });
  }

  public async callUpdateClientAPI(client_id, updateClientRequest) {
    return await request(this.app.getHttpServer())
      .patch(`/clients/${client_id}`)
      .set('Content-Type', 'application/json')
      .send({
        ...updateClientRequest,
      });
  }

  public async callDeleteClientAPI(deleteRequest) {
    return await request(this.app.getHttpServer())
      .post(`/clients/${deleteRequest.client_id}`)
      .set('Content-Type', 'application/json')
      .send({
        user_id: deleteRequest.user_id
      });
  }

  public async callAddCampaignAPI(addClientRequest) {
    return await request(this.app.getHttpServer())
      .post('/campaigns')
      .set('Content-Type', 'application/json')
      .send({
        ...addClientRequest,
      });
  }

  public async callUpdateCampaignAPI(campaign_id, updateCampaignRequest) {
    return await request(this.app.getHttpServer())
      .patch(`/campaigns/${campaign_id}`)
      .set('Content-Type', 'application/json')
      .send({
        ...updateCampaignRequest,
      });
  }

  public async callDeleteCampaignAPI(deleteRequest) {
    return await request(this.app.getHttpServer())
      .post(`/campaigns/${deleteRequest.campaign_id}`)
      .set('Content-Type', 'application/json')
      .send({
        user_id: deleteRequest.user_id
      });
  }

  public async addVendorToCampaign(campaign_id, addVendorRequest) {
    return await request(this.app.getHttpServer())
      .post(`/campaigns/${campaign_id}/add-vendor`)
      .set('Content-Type', 'application/json')
      .send(addVendorRequest);
  }

  public async removeVendorFromCampaign(campaign_id, removeVendorRequest) {
    return await request(this.app.getHttpServer())
      .post(`/campaigns/${campaign_id}/remove-vendor`)
      .set('Content-Type', 'application/json')
      .send(removeVendorRequest);
  }

  public async addClientToCampaign(campaign_id, addClientRequest) {
    return await request(this.app.getHttpServer())
      .post(`/campaigns/${campaign_id}/add-client`)
      .set('Content-Type', 'application/json')
      .send(addClientRequest);
  }

  public async removeClientFromCampaign(campaign_id, removeClientRequest) {
    return await request(this.app.getHttpServer())
      .post(`/campaigns/${campaign_id}/remove-client`)
      .set('Content-Type', 'application/json')
      .send(removeClientRequest);
  }
}



