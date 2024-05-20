import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Vendor, VendorDocument } from "./schemas";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model, Types } from "mongoose";
import { Utils } from '@monorepo/exchange-api-core';
import {v4 as uuid} from 'uuid';
import { VendorApiKey } from "./schemas/vendorapikey.schema";
import { CreateApiKeyDto } from "./dto/create-api-key.dto";
import { User, UserDocument } from "../users/schemas";
import { CreateVendorDto } from "./dto/create-vendor.dto";
import { Admin, AdminDocument } from "../admins/schemas";
import { isMongoId } from "class-validator";
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

/**
 * Promisify scrypt
 */
const scrypt = promisify(_scrypt);

/**
 * This represnets the service for vendor.
 */
@Injectable()
export class VendorsService {

  /**
   * Constructor for the vendor service.
   * @param connection db connection
   * @param userModel user model
   * @param vendorModel vendor model
   * @param adminModel admin model
   * @param vendorApiKeyModel vendor api key model.
   * @param configService configuration service
   */
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Vendor.name)
    private vendorModel: Model<VendorDocument>,
    @InjectModel(Admin.name)
    private adminModel: Model<AdminDocument>,
    @InjectModel(VendorApiKey.name)
    private vendorApiKeyModel: Model<VendorDocument>,
    private configService: ConfigService,
  ) {}


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

  /**
   * This function is used to create a new vendor.
   * @param request create vendor dto
   * @returns 
   */
  async createVendor(request: CreateVendorDto): Promise<Vendor> {
    // const transactionSession = await this.connection.startSession();
    // transactionSession.startTransaction();

    try {

      //Check if the vendor with the same email exists.
      const vendor = await this.vendorModel.findOne({ 'user.email': request.email }).exec();

      if(vendor) {
        return Promise.reject(`Vendor with the email ${request.email} already exists.`);
      }

      if(!isMongoId(request.user_id)) {
        return Promise.reject(`Invalid user_id ${request.user_id}`);
      }

      const addedByUser = await this.adminModel.findById(request.user_id).exec();

      if(!addedByUser) {
        return Promise.reject(`No user found with the id ${request.user_id}`);
      }

      // Generate a random salt
      const salt = this.generateSalt();

      // Hash password with the salt
      const hashedPassword = await this.generateHash(request.password, salt);

      // Concatenate and generate final password
      const finalPassword = this.mergeTargetAndSalt(hashedPassword, salt);

      const [savedUser] = await this.userModel.create([{
        _id: new Types.ObjectId(),
        first_name: request.first_name,
        last_name: request.last_name,
        email: request.email,
        password: finalPassword
        // password: await Utils.encrypt(request.password, this.configService.get<string>('encryptionKey'))
      }]);

      const encryptionKey = this.configService.get<string>('encryptionKey');

      const secretKey = uuid().replace(/-/gi, '');

      const partnerCode = uuid().replace(/-/gi, '');

      const encryptedSecurityKey = await Utils.encrypt(secretKey, encryptionKey);

      const [savedVendor] = await this.vendorModel.create([{
        _id: new Types.ObjectId(),
        user: savedUser,
        security_key: encryptedSecurityKey,
        partner_code: partnerCode,
        added_by: addedByUser,
        added_on: Date.now()
      }]);

      await this.userModel.findByIdAndUpdate(savedUser._id, { $set: { vendor: savedVendor  } }).exec();

      // await transactionSession.commitTransaction();

      return savedVendor;

    } catch (err) {
        // await transactionSession.abortTransaction();
        throw new BadRequestException(`Could not create new vendor ${err.message}`);
    } finally {
        // await transactionSession.endSession();
    }  

  }


  /**
   * This function is used to create a new api key for the vendor.
   * @param vendor_id vendor id
   * @param request create api key request
   * @returns 
   */
  async createApiKey(vendor_id: string, request: CreateApiKeyDto): Promise<Vendor> {
    // const transactionSession = await this.connection.startSession();
    // transactionSession.startTransaction();

    try {
        const vendor = await this.vendorModel.findById(vendor_id).exec();

        if(!vendor) {
            return Promise.reject(`No vendor found with the id ${vendor_id}`);
        }

        const addedByUser = await this.adminModel.findById(request.user_id).exec();

        if(!addedByUser) {
          return Promise.reject(`No user found with the id ${request.user_id}`);
        }
        
        const encryptionKey = this.configService.get<string>('encryptionKey');

        const vendorSecretKey = await Utils.decrypt(vendor.security_key, encryptionKey);

        const apiKey = uuid().replace(/-/gi, '');

        const encryptedApiKey = await Utils.encrypt(apiKey, vendorSecretKey);

        const vendorApiKey = await this.vendorApiKeyModel.create([{
            _id: new Types.ObjectId(),
            vendor,
            api_key: encryptedApiKey,
            added_on: Date.now(),
            added_by: addedByUser
        }]);

        const updatedVendor = await this.vendorModel
                                      .findByIdAndUpdate(vendor_id, { $push: { api_keys: vendorApiKey }, $set: { updated_by: addedByUser, updated_on: Date.now() } }, { new: true })
                                      .populate('api_keys')
                                      .exec();

        // await transactionSession.commitTransaction();

        return updatedVendor;

    } catch (err) {
        // await transactionSession.abortTransaction();
        throw new BadRequestException(`Could not create api key for the vendor ${err.message}`);
    } finally {
        // await transactionSession.endSession();
    }    
  } 
}
