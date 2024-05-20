import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import {
  ClientVortex,
  ClientVortexDocument,
  User,
  UserDocument,
  VendorLeadTypeSetting,
  VendorLeadTypeSettingDocument,
  VendorVortex,
  VendorVortexDocument
} from './schemas';
import { Model, Connection, Types } from "mongoose";
import { CreateUserDto, GetUsersByRoleDto, GetUsersDto, UpdateUserDto, UserPageDto } from "./dto";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { filter, reduce } from 'lodash';
import { Entity, EntityDocument, EntitySetting, EntitySettingDocument, Role, RoleDocument } from "../auth/schemas";
import { LeadType, LeadTypeDocument, VendorSubID, VendorSubIDDocument } from "../verticals/autoinsurance/schemas";
import { sendEmail } from '../helpers';
import { ConfigService } from "@nestjs/config";
import { Campaign, CampaignDocument } from "../campaigns/schemas";
import { SettingsService } from "../settings/settings.service";
import { USER_ACCOUNT_STATUS } from "../config/constants";

/**
 * Promisify script
 */
const scrypt = promisify(_scrypt);

/**
 * This is the main user service which handles all the user functions.
 */
@Injectable()
export class UsersService {
  /**
   * Constructor for the user service.
   */
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Entity.name)
    private entityModel: Model<EntityDocument>,
    @InjectModel(EntitySetting.name)
    private entitySettingModel: Model<EntitySettingDocument>,
    @InjectModel(VendorLeadTypeSetting.name)
    private vendorLeadTypeSettingModel: Model<VendorLeadTypeSettingDocument>,
    @InjectModel(LeadType.name)
    private leadTypeModel: Model<LeadTypeDocument>,
    @InjectModel(VendorVortex.name)
    private vendorVortexModel: Model<VendorVortexDocument>,
    @InjectModel(ClientVortex.name)
    private clientVortexModel: Model<ClientVortexDocument>,
    @InjectModel(Campaign.name)
    private campaignModel: Model<CampaignDocument>,
    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>,
    @InjectModel(VendorSubID.name)
    private vendorSubIDModel: Model<VendorSubIDDocument>,
    private configService: ConfigService,
    private settingsService: SettingsService
  ) { }


  /**
   * This function is used to fetch the user by email.
   * @param email email id of the user.
   */
  async getUserByUsername(username: string): Promise<User> {
    return await this.userModel
      .findOne({ username: { $regex: new RegExp(username, "i") } })
      .populate({ path: 'role', populate: { path: 'permissions', populate: { path: 'entity' } } }).lean().exec();
  }

  /**
 * This function is used to fetch the user by email.
 * @param email email id of the user.
 */
  async getUserByEmail(email: string): Promise<User> {
    return await this.userModel
      .findOne({ email })
      .populate({ path: 'role', populate: { path: 'permissions', populate: { path: 'entity' } } }).lean().exec();
  }

  /**
   * Function to generate a Random Salt
   * */
  private generateSalt(): string {
    return randomBytes(16).toString('hex');
  }

  /**
   * Function to generate a Hash using a String along with Salt
   * */
  private async generateHash(
    target: string,
    salt: string,
  ): Promise<string> {
    return ((await scrypt(target, salt, 32)) as Buffer).toString('hex');
  }

  /**
   * Function to merge hashed target and salt
   * */
  private mergeTargetAndSalt(target: string, salt: string): string {
    return target + '.' + salt;
  }

  async sendVendorWelcome(request: any): Promise<User> {

    const vendor = await this.userModel.findById(request.vendor_id).exec();

    // Generate a random salt
    const salt = this.generateSalt();

    // Hash password with the salt
    const hashedPassword = await this.generateHash(request.password, salt);

    // Concatenate and generate final password
    const finalPassword = this.mergeTargetAndSalt(hashedPassword, salt);

    await this.userModel.findByIdAndUpdate(request.vendor_id, { $set: { password: finalPassword } }).exec();

    await sendEmail(
      'welcome-vendor.ejs',
      {
       receiver_name: `${vendor.first_name} ${vendor.last_name}`,
       vendor_id: vendor._id,
       username: vendor.username,
       password: request.password
      },
      vendor.email,
      this.settingsService.adminCCEmailIds,
      this.settingsService.adminBCCEmailIds,
      "Astoria Login Details",
      null,
      null,
      this.configService.get<string>('SEND_GRID_EMAIL_SERVER'),
      this.configService.get<string>('SEND_GRID_EMAIL_PORT'),
      this.configService.get<string>('SEND_GRID_EMAIL_USERNAME'),
      this.configService.get<string>('SEND_GRID_EMAIL_PASSWORD'));

      return vendor;
  }

  async sendClientWelcome(request: any): Promise<User> {

    const client = await this.userModel.findById(request.client_id).exec();

    // Generate a random salt
    const salt = this.generateSalt();

    // Hash password with the salt
    const hashedPassword = await this.generateHash(request.password, salt);

    // Concatenate and generate final password
    const finalPassword = this.mergeTargetAndSalt(hashedPassword, salt);

    await this.userModel.findByIdAndUpdate(request.client_id, { $set: { password: finalPassword } }).exec();

    await sendEmail(
      'welcome-client.ejs',
      {
       receiver_name: `${client.first_name} ${client.last_name}`,
       vendor_id: client._id,
       username: client.username,
       password: request.password
      },
      client.email,
      this.settingsService.adminCCEmailIds,
      this.settingsService.adminBCCEmailIds,
      "Astoria Login Details",
      null,
      null,
      this.configService.get<string>('SEND_GRID_EMAIL_SERVER'),
      this.configService.get<string>('SEND_GRID_EMAIL_PORT'),
      this.configService.get<string>('SEND_GRID_EMAIL_USERNAME'),
      this.configService.get<string>('SEND_GRID_EMAIL_PASSWORD'));

      return client;
  }

  /**
  * This api is used to create a new user in system.
  * @param userData user data from the api request.
  */
  async createUser(userData: CreateUserDto) {
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    try {
      //Fetch User
      let savedUser = await this.userModel
        .findOne({
          $or: [
            { email: userData.email },
            { username: userData.username }
          ]
        })
        .exec();
      if (savedUser) {
        throw new Error(`User already exists with this email or username`);
      }

      const role = await this.roleModel.findById(userData.role).exec();

      if (!role) {
        throw new Error(`No role found with the Id ${userData.role}`);
      }

      const added_by = await this.userModel.findById(userData.added_by).exec();

      if (!added_by) {
        throw new Error(`No added_by user found with the Id ${userData.added_by}`);
      }

      // Generate a random salt
      const salt = this.generateSalt();

      // Hash password with the salt
      const hashedPassword = await this.generateHash(userData.password, salt);

      // Concatenate and generate final password
      const finalPassword = this.mergeTargetAndSalt(hashedPassword, salt);

      //User doesn't exist, lets create a new user.
      savedUser = await this.userModel.create({
        _id: new Types.ObjectId(),
        first_name: userData.first_name,
        middle_name: userData.middle_name,
        last_name: userData.last_name,
        email: userData.email,
        username: userData.username,
        password: finalPassword,
        role,
        primary_phone: userData.primary_phone,
        secondary_phone: userData.secondary_phone,
        address: userData.address,
        city: userData.city,
        zip: userData.zip,
        country: userData.country,
        website: userData.website,
        user_status: userData.user_status,
        is_call_center: userData.is_call_center,
        accept_returns: userData.accept_returns,
        is_hide_all_leads_reports: userData.is_hide_all_leads_reports,
        is_io_received: userData.is_io_received,
        vendor_lead_quality: userData.vendor_lead_quality,
        lead_flow_status: userData.lead_flow_status,
        is_allowed_by_ews: userData.is_allowed_by_ews,
        is_trusted_form_claim_enabled: userData.is_trusted_form_claim_enabled,
        payment_method: userData.payment_method,
        is_return_reminder_email: userData.is_return_reminder_email,
        prepays: userData.prepays,
        main_email_list: userData.main_email_list,
        tech_email_list: userData.tech_email_list,
        returns_email_list: userData.returns_email_list,
        added_on: Date.now(),
        added_by: added_by._id,
        updated_on: Date.now(),
        updated_by: added_by._id,
        leadhoop_partner_code: userData.leadhoop_partner_code,
        leadhoop_partner_username: userData.leadhoop_partner_username,
        leadhoop_partner_password: userData.leadhoop_partner_password,
        leadhoop_vendor_comission: userData.leadhoop_vendor_comission,
        leadhoop_service_url: userData.leadhoop_service_url
      });

      await this.roleModel.findByIdAndUpdate(role._id, { $push: { users: savedUser } }).exec();

      if (role.name === 'Vendor') {

        const savedVortex = await this.vendorVortexModel.create({
          _id: new Types.ObjectId(),
          vendor: savedUser,
          is_account_created: true,
          is_io_received: true,
          added_by: added_by._id,
          added_on: Date.now(),
          updated_by: added_by._id,
          updated_on: Date.now()
        });

        await this.userModel.findByIdAndUpdate(savedUser._id, { $push: { 'vendor_vortex': savedVortex } }).exec();

        await sendEmail(
          'welcome-vendor.ejs',
          {
           receiver_name: `${userData.first_name} ${userData.last_name}`,
           vendor_id: savedUser._id,
           username: savedUser.username,
           password: userData.password
          },
          savedUser.email,
          this.settingsService.adminCCEmailIds,
          this.settingsService.adminBCCEmailIds,
          "Astoria Login Details",
          null,
          null,
          this.configService.get<string>('SEND_GRID_EMAIL_SERVER'),
          this.configService.get<string>('SEND_GRID_EMAIL_PORT'),
          this.configService.get<string>('SEND_GRID_EMAIL_USERNAME'),
          this.configService.get<string>('SEND_GRID_EMAIL_PASSWORD'));
      } else if (role.name === 'Client') {
        const savedVortex = await this.clientVortexModel.create({
          _id: new Types.ObjectId(),
          client: savedUser,
          is_account_created: true,
          is_io_received: true,
          added_by: added_by._id,
          added_on: Date.now(),
          updated_by: added_by._id,
          updated_on: Date.now()
        });

        await this.userModel.findByIdAndUpdate(savedUser._id, { $push: { 'client_vortex': savedVortex } }).exec();

        await sendEmail(
          'welcome-client.ejs',
          {
            receiver_name: `${userData.first_name} ${userData.last_name}`,
            username: savedUser.username,
            password: userData.password
          },
          savedUser.email,
          this.settingsService.adminCCEmailIds,
          this.settingsService.adminBCCEmailIds,
          "Astoria Login Details",
          null,
          null,
          this.configService.get<string>('SEND_GRID_EMAIL_SERVER'),
          this.configService.get<string>('SEND_GRID_EMAIL_PORT'),
          this.configService.get<string>('SEND_GRID_EMAIL_USERNAME'),
          this.configService.get<string>('SEND_GRID_EMAIL_PASSWORD'));
      }

      await transactionSession.commitTransaction();
      return savedUser;
    } catch (err) {
      await transactionSession.abortTransaction();
      throw new BadRequestException(`Could not create user.${err.message}`);
    } finally {
      await transactionSession.endSession();
    }
  }

  async deleteUser(user_id: string): Promise<boolean> {
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    try {

      const deletedUser = await this.userModel.findByIdAndDelete(user_id).exec();

      if(deletedUser?.campaign) {
        await this.campaignModel.findByIdAndDelete(deletedUser?.campaign._id).exec();
      }

      await this.roleModel.findByIdAndUpdate(deletedUser.role, { $pull: { users: deletedUser._id } }).exec();

      const linkedCampaigns = await this.campaignModel.find({
        vendors: {
          $elemMatch: { id: deletedUser._id }
       }
      }).exec();

      if(linkedCampaigns.length > 0) {
        await Promise.allSettled(linkedCampaigns.map(async (campaign) => {
          await this.campaignModel.findByIdAndUpdate(campaign._id, { $pull: { vendors: deletedUser._id } }).exec();
        }));
      }

      if(deletedUser?.vendor_vortex?.length > 0) {
        await Promise.all(deletedUser.vendor_vortex.map(async vortex => {
          await this.vendorVortexModel.findByIdAndDelete(vortex).exec();
        }));
      }

      if(deletedUser?.client_vortex?.length > 0) {
        await Promise.all(deletedUser.client_vortex.map(async vortex => {
          await this.clientVortexModel.findByIdAndDelete(vortex).exec();
        }));
      }

      if (deletedUser.lead_type_settings?.length > 0) {
        deletedUser.lead_type_settings.map(async (setting) => {
          await this.vendorLeadTypeSettingModel.findByIdAndRemove(setting._id).exec();
        });
      }

      await this.campaignModel.deleteMany({ added_by: deletedUser._id }).exec();

      const addedUsers = await this.userModel.find({ added_by: deletedUser._id }).exec();

      await Promise.all(addedUsers.map(async user => {
        await this.campaignModel.deleteMany({ added_by: user._id }).exec();
        await this.vendorLeadTypeSettingModel.deleteMany({ added_by: deletedUser._id }).exec();
      }));

      await this.userModel.deleteMany({ added_by: deletedUser._id }).exec();

      return true;
    } catch (err) {
      await transactionSession.abortTransaction();
      throw new BadRequestException(`Could not delete user.${err.message}`);
    } finally {
      await transactionSession.endSession();
    }
  }

  async updateUser(request: UpdateUserDto, user_id: string): Promise<any> {
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();

    try {
      const updatedObj = {};
      //Fetch User
      let savedUser = await this.userModel
        .findById(user_id)
        .exec();

      if (!savedUser) {
        throw new Error(`No user found with the Id ${user_id}`);
      }

      if (request.role) {
        const role = await this.roleModel.findById(request.role).exec();

        if (!role) {
          throw new Error(`No role found with the Id ${request.role}`);
        }

        updatedObj['role'] = role;
      }

      const updated_by = await this.userModel.findById(request.updated_by).exec();

      if (!updated_by) {
        throw new Error(`No updated_by user found with the Id ${request.updated_by}`);
      }

      updatedObj['updated_by'] = updated_by;
      updatedObj['updated_on'] = Date.now();

      if (request.password) {
        // Generate a random salt
        const salt = this.generateSalt();

        // Hash password with the salt
        const hashedPassword = await this.generateHash(request.password, salt);

        // Concatenate and generate final password
        const finalPassword = this.mergeTargetAndSalt(hashedPassword, salt);

        updatedObj['password'] = finalPassword;
      }

      if (request.first_name) {
        updatedObj['first_name'] = request.first_name;
      }
      if (request.middle_name) {
        updatedObj['middle_name'] = request.middle_name;
      }
      if (request.last_name) {
        updatedObj['last_name'] = request.last_name;
      }
      if (request.email) {
        updatedObj['email'] = request.email;
      }
      if (request.username) {
        updatedObj['username'] = request.username;
      }
      if (request.primary_phone) {
        updatedObj['primary_phone'] = request.primary_phone;
      }
      if (request.secondary_phone) {
        updatedObj['secondary_phone'] = request.secondary_phone;
      }
      if (request.address) {
        updatedObj['address'] = request.address;
      }
      if (request.city) {
        updatedObj['city'] = request.city;
      }
      if (request.zip) {
        updatedObj['zip'] = request.zip;
      }
      if (request.country) {
        updatedObj['country'] = request.country;
      }
      if (request.website) {
        updatedObj['website'] = request.website;
      }
      if (request.is_call_center) {
        updatedObj['is_call_center'] = request.is_call_center;
      }
      if (request.accept_returns) {
        updatedObj['accept_returns'] = request.accept_returns;
      }
      if (request.is_hide_all_leads_reports) {
        updatedObj['is_hide_all_leads_reports'] = request.is_hide_all_leads_reports;
      }
      if (request.is_io_received) {
        updatedObj['is_io_received'] = request.is_io_received;
      }
      if (request.vendor_lead_quality) {
        updatedObj['vendor_lead_quality'] = request.vendor_lead_quality;
      }
      if (request.lead_flow_status) {
        updatedObj['lead_flow_status'] = request.lead_flow_status;
      }
      if (request.is_allowed_by_ews) {
        updatedObj['is_allowed_by_ews'] = request.is_allowed_by_ews;
      }
      if (request.is_trusted_form_claim_enabled) {
        updatedObj['is_trusted_form_claim_enabled'] = request.is_trusted_form_claim_enabled;
      }
      if (request.payment_method) {
        updatedObj['payment_method'] = request.payment_method;
      }
      if (request.is_return_reminder_email) {
        updatedObj['is_return_reminder_email'] = request.is_return_reminder_email;
      }
      if (request.prepays) {
        updatedObj['prepays'] = request.prepays;
      }
      if (request.main_email_list) {
        updatedObj['main_email_list'] = request.main_email_list;
      }
      if (request.tech_email_list) {
        updatedObj['tech_email_list'] = request.tech_email_list;
      }
      if (request.returns_email_list) {
        updatedObj['returns_email_list'] = request.returns_email_list;
      }
      if (request.leadhoop_partner_code) {
        updatedObj['leadhoop_partner_code'] = request.leadhoop_partner_code;
      }
      if (request.leadhoop_partner_username) {
        updatedObj['leadhoop_partner_username'] = request.leadhoop_partner_username;
      }
      if (request.leadhoop_partner_password) {
        updatedObj['leadhoop_partner_password'] = request.leadhoop_partner_password;
      }
      if (request.leadhoop_vendor_comission) {
        updatedObj['leadhoop_vendor_comission'] = request.leadhoop_vendor_comission;
      }
      if (request.leadhoop_service_url) {
        updatedObj['leadhoop_service_url'] = request.leadhoop_service_url;
      }


      savedUser = await this.userModel.findByIdAndUpdate(user_id, {
        ...updatedObj
      }).populate({ path: 'role' })
        .populate({ path: 'vendor_subids' })
        .populate({ path: 'lead_type_settings', populate: { path: 'lead_type' } })
        .exec();

      if(request.vendor_subids?.length > 0) {
        const allVendorSubIds = await this.vendorSubIDModel.find({ vendor: savedUser._id }).exec();
        await Promise.allSettled(allVendorSubIds.map(async (subId: any) => {
          const filterSubId = filter(request.vendor_subids, { _id: subId._id.toString() });
          if(subId.vendor.toString() === savedUser._id.toString() && filterSubId?.length > 0 && subId.is_blocked !== filterSubId[0].is_blocked) {
            await this.vendorSubIDModel.findByIdAndUpdate(subId._id, { is_blocked: filterSubId[0].is_blocked }).exec();
          }
        }));
      }

      if (!request.lead_type_settings || (request.lead_type_settings && request.lead_type_settings.length === 0)) {
        await this.vendorLeadTypeSettingModel.deleteMany({ vendor: savedUser._id }).exec();
        await this.userModel.findByIdAndUpdate(savedUser._id, { $unset: { lead_type_settings: 1 } }).exec();
      } else {
        await this.vendorLeadTypeSettingModel.deleteMany({ vendor: savedUser._id }).exec();
        await this.userModel.findByIdAndUpdate(savedUser._id, { $unset: { lead_type_settings: 1 } }).exec();

        request.lead_type_settings.map(async (setting) => {
          const lead_type = await this.leadTypeModel.findById(setting.lead_type).exec();
          const newLeadTypeSettingVendor = await this.vendorLeadTypeSettingModel.create({
            _id: setting._id || new Types.ObjectId(),
            vendor: savedUser,
            lead_type,
            ...setting
          });

          await this.userModel.findByIdAndUpdate(user_id, {
            $push: { lead_type_settings: newLeadTypeSettingVendor._id }
          }).exec();
        });
      }

      const updatedUser = await this.userModel.aggregate([
        {
          $match: {
            _id: new Types.ObjectId(user_id)
          }
        },
        {
          $lookup: {
            from: 'roles',
            localField: '_id',
            foreignField: 'users',
            as: 'role'
          }
        },
        {
          $unwind: {
            path: "$role",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: 'vendorleadtypesettings',
            localField: '_id',
            foreignField: 'vendor',
            as: 'lead_type_settings'
          }
        },
        {
          $lookup: {
            from: 'leadtypes',
            localField: 'lead_type_settings.lead_type',
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
        {
          $lookup: {
            from: 'vendorsubids',
            localField: '_id',
            foreignField: 'vendor',
            as: 'vendor_subids'
          }
        },
      ]);

      //const updatedUser = await this.userModel.findById(user_id).populate({ path: 'role' }).populate({ path: 'lead_type_settings', populate: { path: 'lead_type' } }).exec();

      await transactionSession.commitTransaction();
      return updatedUser;
    } catch (err) {
      await transactionSession.abortTransaction();
      throw new BadRequestException(`Could not update user.${err.message}`);
    } finally {
      await transactionSession.endSession();
    }
  }

  /**
   * This function is used to fetch a single user by id.
   * @param user_id
   * @returns
   */
  async fetchUserById(user_id: string): Promise<any> {
    const user = await this.userModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(user_id)
        }
      },
      {
        $lookup: {
          from: 'roles',
          localField: '_id',
          foreignField: 'users',
          as: 'role'
        }
      },
      {
        $unwind: {
          path: "$role",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'vendorleadtypesettings',
          localField: '_id',
          foreignField: 'vendor',
          as: 'lead_type_settings'
        }
      },
      {
        $lookup: {
          from: 'leadtypes',
          localField: 'lead_type_settings.lead_type',
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
      {
        $lookup: {
          from: 'vendorsubids',
          localField: '_id',
          foreignField: 'vendor',
          as: 'vendor_subids'
        }
      },
    ]);

    return user[0];
  }

  async fetchUsersByRole(params: GetUsersByRoleDto): Promise<User[]> {

    const role = await this.roleModel.findOne({
      name: { $regex : params.role_name , '$options' : 'i'}
    }).exec();

    return await this.userModel.aggregate([
      {
        $match: {
          role: role._id,
          user_status: params.include_disabled === true ? USER_ACCOUNT_STATUS.Inactive : { $in: [ USER_ACCOUNT_STATUS.ActiveLive, USER_ACCOUNT_STATUS.ActiveTest ] }
        }
      }
    ]);
  }

  /**
   * This function is used to fetch all the users including vendors & clients.
   */
  async fetchAllUsers(body: GetUsersDto): Promise<UserPageDto> {

    const sorting = body.sort.map((sort) => {
      if (sort.field === 'user_status') {
        if (sort.sort === 'asc') {
          return { user_status: 1 };
        } else {
          return { user_status: -1 };
        }
      }
      if (sort.field === 'email') {
        if (sort.sort === 'asc') {
          return { email: 1 };
        } else {
          return { email: -1 };
        }
      }
      if (sort.field === 'primary_phone') {
        if (sort.sort === 'asc') {
          return { primary_phone: 1 };
        } else {
          return { primary_phone: -1 };
        }
      }
      if (sort.field === 'role') {
        if (sort.sort === 'asc') {
          return { 'role.role': 1 };
        } else {
          return { 'role.role': -1 };
        }
      }
      if (sort.field === 'name') {
        if (sort.sort === 'asc') {
          return { first_name: 1 };
        } else {
          return { first_name: -1 };
        }
      }
      if (sort.field === 'username') {
        if (sort.sort === 'asc') {
          return { username: 1 };
        } else {
          return { username: -1 };
        }
      }
    })
    const sortOptions = reduce(sorting, srt => {
      return srt;
    });

    const filters = body.filters.map((filter) => {
      if (filter.field === 'role') {
        return { 'role._id': new Types.ObjectId(filter.value) };
      }
      if (filter.field === 'lead_type') {
        return { 'lead_type_settings.lead_type': { $eq: new Types.ObjectId(filter.value) } };
      }
      if (filter.field === 'username' && filter.value?.length > 0) {
        if (filter.operator === 'contains') {
          return { username: { '$regex': filter.value, $options: 'i' } };
        } else {
          return { username: { $eq: filter.value } };
        }
      }
      if (filter.field === 'name' && filter.value?.length > 0) {
        if (filter.operator === 'contains') {
          return {
            $or: [
              { first_name: { '$regex': filter.value, $options: 'i' } },
              { middle_name: { '$regex': filter.value, $options: 'i' } },
              { last_name: { '$regex': filter.value, $options: 'i' } },
            ]
          };
        } else {
          return {
            $or: [
              { first_name: { $eq: filter.value } },
              { middle_name: { $eq: filter.value } },
              { last_name: { $eq: filter.value } },
            ]
          };
        }
      }
      if (filter.field === 'email' && filter.value?.length > 0) {
        if (filter.operator === 'contains') {
          return { email: { '$regex': filter.value, $options: 'i' } };
        } else {
          return { email: { $eq: filter.value } };
        }
      }
      if (filter.field === 'primary_phone' && filter.value?.length > 0) {
        if (filter.operator === 'contains') {
          return { primary_phone: { '$regex': filter.value, $options: 'i' } };
        } else {
          return { primary_phone: { $eq: filter.value } };
        }
      }
      if (filter.field === 'user_status' && filter.value?.toString().length > 0) {
        if (filter.value === true && filter.operator === '=') {
          return { user_status: { $eq: true } };
        } else if (filter.value === 'active' && filter.operator === '!=') {
          return { user_status: { $eq: false } };
        } else if (filter.value === 'inactive' && filter.operator === '=') {
          return { user_status: { $eq: false } };
        } else if (filter.value === 'inactive' && filter.operator === '!=') {
          return { user_status: { $eq: true } };
        }
      }
    });
    const filterOptions = reduce(filters, fltr => {
      return fltr;
    });

    const users = await this.userModel.aggregate([
      {
        $lookup: {
          from: 'roles',
          localField: '_id',
          foreignField: 'users',
          as: 'role'
        }
      },
      {
        $unwind: {
          path: "$role",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'vendorleadtypesettings',
          localField: '_id',
          foreignField: 'vendor',
          as: 'lead_type_settings'
        }
      },
      { $match: filterOptions || {} },
      {
        $project: {
          _id: 1,
          username: 1,
          first_name: 1,
          middle_name: 1,
          last_name: 1,
          email: 1,
          primary_phone: 1,
          secondary_phone: 1,
          address: 1,
          zip: 1,
          city: 1,
          country: 1,
          website: 1,
          user_status: 1,
          'role._id': 1,
          'role.name': 1,
          'lead_type_settings._id': 1,
          'lead_type_settings.lead_type': 1
        }
      },
      { $sort: sortOptions || { username: 1 } },
      { $skip: body.page_offset * body.page_size },
      { $limit: body.page_size }
    ]);


    const count = await this.userModel.countDocuments(filterOptions).exec();
    const totalPages = Math.floor((count - 1) / body.page_size) + 1;

    return new UserPageDto(users, totalPages);
  }

  /**
   * This function is used to return all the settings for the specific user type.
   */
  async fetchUserSettings(type: string): Promise<EntitySetting[]> {

    const entity = await this.entityModel.findOne({
      name: type
    }).exec();

    return await this.entitySettingModel.find({ entity }).exec();

  }
}
