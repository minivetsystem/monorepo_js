import {
  forwardRef,
  Inject,
  Injectable, UnauthorizedException
} from "@nestjs/common";
import { UsersService } from '../users/users.service';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { LoginDto } from './dto/login.dto';
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { InjectConnection, InjectModel, Schema } from "@nestjs/mongoose";
import { Connection, Model, Types } from "mongoose";
import {
  User,
  UserDocument
} from '../users/schemas'
import { Entity, EntityDocument, EntitySetting, EntitySettingDocument, Permission } from "./schemas";
import bcrypt from 'bcrypt';

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
    @InjectConnection()
    private readonly connection: Connection,
    /**
     * user model instance.
     */
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    /**
    * entity model instance.
    */
    @InjectModel(Entity.name)
    private entityModel: Model<EntityDocument>,
    /**
    * entity setting model instance.
    */
    @InjectModel(EntitySetting.name)
    private entitySettingModel: Model<EntitySettingDocument>,
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
    private jwtService: JwtService
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

  async getTokens(payload: JwtPayloadInterface) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        payload,
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '2d',
        },
      ),
      this.jwtService.signAsync(
        payload,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * @function - splitHashedPassword
   * @param - hashedPassword
   * */
  private static splitHashedPassword(hashedPassword: string): string[] {
    return hashedPassword.split('.');
  }


  private async compareAsync(param1, param2) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(param1, param2, function(err, res) {
            if (err) {
                 reject(err);
            } else {
                 resolve(res);
            }
        });
    });
}

  /**
   * Function to authenticate a user
   * @param body type LoginDto
   * */
  public async authenticate(body: LoginDto) {
    const { username, password } = body;

    // Get the user from the database
    const user = await this.usersService.getUserByUsername(username);

    // Throw error if the user does not exit
    if (!user) {
      return Promise.reject(`No user exists with the username ${username}`);
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
    const accessTokens = await this.getTokens({
      username: user.username,
    });

    // Return the user
    return {
      ...user,
      accessToken: accessTokens.accessToken,
      refreshToken: accessTokens.refreshToken
    };
  }

  /**
   * This function is used to fetch the refresh token
   * @param user user request object.
   */
  public async refreshToken(user) {
    const userTokens = await this.getTokens({
      username: user.username,
    });
    return {
      accessToken: userTokens.accessToken,
      refreshToken: userTokens.refreshToken
    };
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
}
