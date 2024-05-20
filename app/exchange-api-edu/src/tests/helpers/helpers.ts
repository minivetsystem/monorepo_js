import { Model } from "mongoose";
import {
  Vendor,
  VendorDocument
} from "../../vendors/schemas";
import { User, UserDocument } from "../../users/schemas";
import { Admin, AdminDocument } from "../../admins/schemas";
import { getModelToken } from "@nestjs/mongoose";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { VendorApiKey, VendorApiKeyDocument } from "../../vendors/schemas/vendorapikey.schema";
import { Entity, EntityDocument, Permission, PermissionDocument, Role, RoleDocument } from "../../auth/schemas";

export class Helpers {
  vendorModel: Model<VendorDocument>;
  userModel: Model<UserDocument>;
  adminModel: Model<AdminDocument>;
  vendorApiKeyModel: Model<VendorApiKeyDocument>;
  entityModel: Model<EntityDocument>;
  permissionModel: Model<PermissionDocument>;
  roleModel: Model<RoleDocument>;
  app: INestApplication;

  constructor(app: INestApplication) {
    this.app = app;
    this.vendorModel = app.get<Model<VendorDocument>>(getModelToken(Vendor.name));
    this.userModel = app.get<Model<UserDocument>>(getModelToken(User.name));
    this.adminModel = app.get<Model<AdminDocument>>(getModelToken(Admin.name));
    this.vendorApiKeyModel = app.get<Model<VendorApiKeyDocument>>(getModelToken(VendorApiKey.name));
    this.entityModel = app.get<Model<EntityDocument>>(getModelToken(Entity.name));
    this.permissionModel = app.get<Model<PermissionDocument>>(getModelToken(Permission.name));
    this.roleModel = app.get<Model<RoleDocument>>(getModelToken(Role.name));
  }

  public async clearAllVendorData() {
    await this.userModel.deleteMany({});
    await this.adminModel.deleteMany({});
    await this.vendorModel.deleteMany({});
    await this.vendorApiKeyModel.deleteMany({});
    await this.entityModel.deleteMany({});
    await this.permissionModel.deleteMany({});
    await this.roleModel.deleteMany({});
  }

  public async callAddVendorAPI(addVendorRequest) {
      return await request(this.app.getHttpServer())
      .post('/vendors')
      .set('Content-Type', 'application/json')
      .send({
        ...addVendorRequest,
      });
  }

  public async callCreateApiKey(apiKeyData) {
    return await request(this.app.getHttpServer())
    .post(`/vendors/${apiKeyData.vendor_id}/create-api-key`)
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${apiKeyData.authToken}`)
    .send({
      user_id: apiKeyData.user_id,
    });
  }

  public async addAdminUser(userData, admin) {
   const user = await this.userModel.create(userData);
   return await this.adminModel.create({
    _id: admin._id,
    user,
    added_by: '643e1731dbc5d5a72b124f8f',
    added_on: Date.now()
   });
  }

  public async addDefaultRolesData() {
    await this.entityModel.create({
      _id: '643e1562dbc5d5a72b124f7c',
      name: 'Vendor'
    });
    await this.permissionModel.create({
      _id: '643e157edbc5d5a72b124f80',
      action: 'Manage',
      entity: '643e1562dbc5d5a72b124f7c'
    });
    await this.roleModel.create({
      _id: '643e15b9dbc5d5a72b124f84',
      name: 'Admin',
      permissions: [
        '643e157edbc5d5a72b124f80'
      ]
    });
  }

  public async callLogin(param) {
    const response = await request(this.app.getHttpServer())
    .post('/auth/login')
    .set('Content-Type', 'application/json')
    .send(param);

    return response.body.accessToken;
  }

  public async callSearchApi(param) {
    if(param.api_key) {
      return await request(this.app.getHttpServer())
      .post('/searches')
      .set('Content-Type', 'application/json')
      .set('x-api-key', param.api_key)
      .set('x-secret', param.security_key)
      .send(param);
    } else {
      return await request(this.app.getHttpServer())
      .post('/searches')
      .set('Content-Type', 'application/json')
      .send(param);
    }

  }

  public async callResultApi(param) {
    if(param.api_key) {
      return await request(this.app.getHttpServer())
      .get('/searches/results')
      .set('Content-Type', 'application/json')
      .set('x-api-key', param.api_key)
      .set('x-secret', param.security_key)
      .query(param);
    } else {
      return await request(this.app.getHttpServer())
      .get('/searches/results')
      .set('Content-Type', 'application/json')
      .query(param)
    }
  }

}



