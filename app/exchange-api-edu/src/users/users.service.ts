import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Model, Connection, Types } from "mongoose";
import { User, UserDocument } from "./schemas";
import { Role, RoleDocument } from "../auth/schemas";
import { Vendor, VendorDocument } from "../vendors/schemas";
import { UserPageDto, GetUsersDto, CreateUserDto } from "./dto";
import { reduce } from 'lodash';
import { UpdateUserDto } from "./dto/update-user.dto";
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { ConfigService } from "@nestjs/config";
import { v4 as uuid } from 'uuid';
import { Utils } from '@monorepo/exchange-api-core';
import { ROLE } from "../config/constants";
/**
 * Promisify scrypt
 */
const scrypt = promisify(_scrypt);

/**
 * This is the users service.
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
    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>,
    @InjectModel(Vendor.name)
    private vendorModel: Model<VendorDocument>,
    private configService: ConfigService,
  ) { }

  /**
   * This function is used to fetch the user by email.
   * @param email email id of the user.
   */
  async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }, null, { strictQuery: false }).populate({
      path: 'role',
      select: 'name -_id', // Include 'name' and exclude '_id'
    }).lean().exec();
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
    })
    const sortOptions = reduce(sorting, srt => {
      return srt;
    });

    const filters = body.filters.map((filter) => {
      if (filter.field === 'role') {
        return { 'role._id': new Types.ObjectId(filter.value) };
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
          localField: 'role',
          foreignField: '_id',
          as: 'role'
        }
      },
      {
        $unwind: {
          path: "$role",
          preserveNullAndEmptyArrays: true
        }
      },
      { $match: filterOptions || {} },
      {
        $project: {
          _id: 1,
          first_name: 1,
          last_name: 1,
          email: 1,
          user_status: 1,
          primary_phone: 1,
          'role._id': 1,
          'role.name': 1
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
   * This function is used to fetch a single user by id.
   * @param user_id 
   * @returns 
   */
  async fetchUserById(user_id: string): Promise<User> {
    return await this.userModel
      .findById(user_id)
      .populate({
        path: 'role',
        select: 'name -_id', // Include 'name' and exclude '_id'
      })
      .exec();
  }

  async updateUser(request: UpdateUserDto, user_id: string): Promise<User> {
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

      // if (request.password) {
      //   // Generate a random salt
      //   const salt = this.generateSalt();

      //   // Hash password with the salt
      //   const hashedPassword = await this.generateHash(request.password, salt);

      //   // Concatenate and generate final password
      //   const finalPassword = this.mergeTargetAndSalt(hashedPassword, salt);

      //   updatedObj['password'] = finalPassword;
      // }

      if (request.first_name) {
        updatedObj['first_name'] = request.first_name;
      }
      if (request.last_name) {
        updatedObj['last_name'] = request.last_name;
      }
      if (request.email) {
        updatedObj['email'] = request.email;
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
      if (request.user_status) {
        updatedObj['user_status'] = request.user_status;
      }

      savedUser = await this.userModel.findByIdAndUpdate(user_id, {
        ...updatedObj
      }).populate({ path: 'role' }).exec();

      const updatedUser = await this.userModel.findById(user_id).populate({ path: 'role' }).exec();

      // await transactionSession.commitTransaction();
      return updatedUser;
    } catch (err) {
      // await transactionSession.abortTransaction();
      throw new BadRequestException(`Could not update user.${err.message}`);
    } finally {
      // await transactionSession.endSession();
    }
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

  /**
  * This api is used to create a new user in system.
  * @param userData user data from the api request.
  */
  async createUser(userData: CreateUserDto) {
    // const transactionSession = await this.connection.startSession();
    // transactionSession.startTransaction();

    try {
      //Fetch User
      let savedUser = await this.userModel
        .findOne({
          email: userData.email
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
        last_name: userData.last_name,
        email: userData.email,
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
        added_on: Date.now(),
        added_by: added_by._id,
        updated_on: Date.now(),
        updated_by: added_by._id
      });

      await this.roleModel.findByIdAndUpdate(role._id, { $push: { users: savedUser } }).exec();

      if (role.name === 'Vendor') {
        const encryptionKey = this.configService.get<string>('encryptionKey');
        const secretKey = uuid().replace(/-/gi, '');
        const partnerCode = uuid().replace(/-/gi, '');
        const encryptedSecurityKey = await Utils.encrypt(secretKey, encryptionKey);

        const [savedVendor] = await this.vendorModel.create([{
          _id: new Types.ObjectId(),
          user: savedUser,
          security_key: encryptedSecurityKey,
          partner_code: partnerCode,
          added_by: added_by._id,
          added_on: Date.now()
        }]);

        await this.userModel.findByIdAndUpdate(savedUser._id, { $set: { vendor: savedVendor } }).exec();
      }

      // await transactionSession.commitTransaction();
      return savedUser;
    } catch (err) {
      // await transactionSession.abortTransaction();
      throw new BadRequestException(`Could not create user.${err.message}`);
    } finally {
      // await transactionSession.endSession();
    }
  }
  // this api is used to delete user

  async deleteUserById(user_id: string, logged_in_user: string): Promise<string> {
    try {
      if (logged_in_user["_id"] == user_id) {
        throw new Error('You do not have permission to delete this user.');
      }

      //Fetch User
      const role_of_user = await this.fetchUserById(user_id)      
      if (logged_in_user["role"]["name"] == ROLE.Vendor && role_of_user["role"]["name"] == ROLE.Admin) {
        throw new Error('You do not have permission to delete this user.');
      }
      
      const deleteUser = await this.userModel
        .findOneAndDelete({
          _id: user_id
        })

      if (deleteUser) {
        return ("user deleted successfully")
      } else {
        throw new BadRequestException(`Unable to delete user`);
      }

    } catch (err) {
      // await transactionSession.abortTransaction();
      throw new BadRequestException(`${err.message}`);
    } finally {
      // await transactionSession.endSession();
    }
  }
}
