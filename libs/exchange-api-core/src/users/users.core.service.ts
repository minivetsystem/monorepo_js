import { Injectable } from "@nestjs/common";
import { Users, UsersDocument } from "./user.core.schema";
import { IUser } from "./interfaces/IUser.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserCreateDto } from "./dto/user.create.dto";

@Injectable()
export class UsersCoreService {
  constructor(
    /*
     * InJect the Users Model
     * */
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>
  ) {
  }

  /*
   * ========================================
   * Methods triggered by POST controllers
   * ========================================
   * */
  public async create(createUser: UserCreateDto): Promise<IUser> {
    // Create the user
    const newUser = await this.usersModel.create({ ...createUser });
    return newUser.save();
  }

  /*
   * ========================================
   * Methods For Internal Application Use
   * ========================================
   * */

  /*
   * Find a single user by email
   */
  public async findUserByEmail(email: string) {
    return await this.usersModel.findOne({ email }).exec();
  }

  /*
   * Find a single user by id
   */
  public async findUserById(_id: string) {
    return await this.usersModel.findOne({ _id }).exec();
  }
}
