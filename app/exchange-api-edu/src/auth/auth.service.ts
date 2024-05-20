import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable, UnauthorizedException
} from "@nestjs/common";
import { UsersService } from '../users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { LoginDto } from './dto/login.dto';
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import {
  User,
  UserDocument
} from '../users/schemas'
import { Permission } from "./schemas";
import { Vendor, VendorDocument } from "../vendors/schemas";
import { VendorApiKey, VendorApiKeyDocument } from "../vendors/schemas";
import { Utils } from "@monorepo/exchange-api-core";
import { compact, map } from 'lodash';

/**
 * Promisify scrypt
 */
const scrypt = promisify(_scrypt);

/**
 * This is the auth service used to login and refresh token.
 */
@Injectable()
export class AuthService {
  /**
   * This is the main constructor for the class.
   * @param userModel user model instance.
   * @param httpService http service instance.
   * @param configService config service instance.
   * @param usersService users service instance.
   * @param jwtService jwt service instance
   */
  constructor(
    /**
     * connection
     */    
    @InjectConnection()
    private readonly connection: Connection,
    /**
    * vendor model instance.
    */
    @InjectModel(Vendor.name)
    private vendorModel: Model<VendorDocument>,
     /**
    * vendor api key model instance.
    */
    @InjectModel(VendorApiKey.name)
    private vendorApiKeyModel: Model<VendorApiKeyDocument>,
    /**
     * user model instance.
     */
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    /**
     * http service instance
     */
    private readonly httpService: HttpService,
    /**
     * config service instance.
     */
    private configService: ConfigService,
    /**
     * users service instance.
     */
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    /**
     * jwt service instance
     */
    private jwtService: JwtService,
  ) {}

  /**
   * Function to generate a Hash using a String along with Salt
   * */
  private static async generateHash(
    target: string,
    salt: string,
  ): Promise<string> {
    return ((await scrypt(target, salt, 32)) as Buffer).toString('hex');
  }

  /**
   * @Function: generateJWT
   * @param: payload
   * Generates a JWT for the signed in user
   * */
  public async generateJWT(payload: JwtPayloadInterface): Promise<string> {
    return this.jwtService.sign(payload);
  }

  /**
   * @function - splitHashedPassword
   * @param - hashedPassword
   * */
  private static splitHashedPassword(hashedPassword: string): string[] {
    return hashedPassword.split('.');
  }

  /**
   * Function to authenticate a user
   * @param body type LoginDto
   * */
  public async authenticate(body: LoginDto) {

    try {

      const { email, password } = body;

      // Get the user from the database
      const user = await this.usersService.getUserByEmail(email);
  
      // Throw error if the user does not exit
      if (!user) {
        return Promise.reject(`No user found with email ${email}`);
      }
  
      // split hashed password for the user
      const passwordArray = AuthService.splitHashedPassword(user.password);
  
      // Generarte user sent password hash
      const userPasswordHash = await AuthService.generateHash(
        password,
        passwordArray[1],
      );
  
      // Throw an error if the passwords do not match
      if (userPasswordHash !== passwordArray[0]) {
        return Promise.reject('The login credentials are not correct');
      }
  
      // Generate the access token
      const accessToken: string = await this.generateJWT({
        email: user.email,
      });  
  
      delete user.password;
      // Return the user
      return {
        ...user,
        accessToken: accessToken,
      };
    } catch (err) {
      throw new BadRequestException(`Could not authenticate user ${err.message}`);
    } 
  }

  /**
   * This function is used to fetch the refresh token
   * @param user user request object.
   */
  public async refreshToken(user) {
    const accessToken = await this.generateJWT({
      email: user.email,
    });
    return { accessToken };
  }

  /**
   * This function is used to fetch all the permissions for the user.
   * @param user_id user_id
   */
  async fetchUserPermissions(user_id: string): Promise<Permission[]> {
    try {
      const user = await this.userModel
        .findById(user_id)
        .populate({ path: 'role', populate: { path: 'permissions', populate: { path: 'entity' } } })
        .exec();

      return user.role.permissions;
    } catch(err) {
      throw new UnauthorizedException('User is not authorised.');
    }
  }

  /**
   * This function is used to validate the api key and secret key for the vendor.
   * @param partner_code partner code
   * @param api_key api key
   * @param secret_key secret key
   */
  async validateApiKey(partner_code: string, api_key: string, secret_key: string): Promise<boolean> {

      const vendor = await this.vendorModel
                                .findOne({ partner_code })
                                .populate('api_keys')
                                .exec();

      if(!vendor) {
        return Promise.reject(`No vendor found with the partner_code ${partner_code}`);
      }

      const encryptionKey = this.configService.get<string>('encryptionKey');

      const decryptedSecurityKey = await Utils.decrypt(vendor.security_key, encryptionKey);
      const decryptedPostedSecurityKey = await Utils.decrypt(secret_key, encryptionKey);

      if(decryptedPostedSecurityKey !== decryptedSecurityKey) {
        return Promise.reject(`Invalid security key ${secret_key}`);
      }

      const apiKeyExists = await Promise.all(map(vendor.api_keys, async (key) => {
        const decryptedApiKey = await Utils.decrypt(key.api_key, decryptedSecurityKey);
        const decryptedPostedApiKey = await Utils.decrypt(api_key, decryptedSecurityKey);

        if(decryptedApiKey === decryptedPostedApiKey) {
          return key;
        }
      }));

      return compact(apiKeyExists).length > 0 ? true : false;
  }

  async getVendorByAPIKey(api_key: string): Promise<Vendor> {
    const vendorApiDoc = await this.vendorApiKeyModel.findOne({ api_key })
                        .populate("vendor")
                        .exec();
    if (vendorApiDoc && vendorApiDoc?.vendor)
      return vendorApiDoc.vendor
    else
      return Promise.reject(`No vendor found with the api_key ${api_key}`);
  }
}
