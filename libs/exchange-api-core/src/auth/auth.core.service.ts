import {
  Injectable,
  forwardRef,
  Inject,
  ConflictException,
} from '@nestjs/common';
import { UsersCoreService } from '../users/users.core.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/user.core.schema';
import { UserCreateDto } from '../users/dto/user.create.dto';
import { IJwtPayload } from './interfaces/JwtPayload.interface';

// Promisify scrypt
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthCoreService {
  constructor(
    /*
     * Inject the UserCoreService
     * */
    @Inject(forwardRef(() => UsersCoreService))
    private usersCoreService: UsersCoreService,

    /*
     * Inject the ConfigService
     * */
    private configService: ConfigService,

    /*
     * Inject the JwtService
     * */
    private jwtService: JwtService,
  ) {}

  /*
   * Function to generate a Random Salt
   * */
  private static generateSalt(): string {
    return randomBytes(16).toString('hex');
  }

  /*
   * Function to generate a Hash using a String along with Salt
   * */
  private static async generateHash(
    target: string,
    salt: string,
  ): Promise<string> {
    return ((await scrypt(target, salt, 32)) as Buffer).toString('hex');
  }

  /*
   * Function to merge hashed target and salt
   * */
  private static mergeTargetAndSalt(target: string, salt: string): string {
    return target + '.' + salt;
  }

  /*
   * @function - splitHashedPassword
   * @param - hashedPassword
   * */
  private static splitHashedPassword(hashedPassword: string): string[] {
    return hashedPassword.split('.');
  }

  /*
   * Function to check if the user is unique
   * */
  private async isUserUnique(email: string): Promise<boolean> {
    const user = await this.usersCoreService.findUserByEmail(email);
    return !user;
  }

  /*
   * @Function: generateJWT
   * @param: payload
   * Generates a JWT for the signed in user
   * */
  public async generateJWT(payload: IJwtPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }

  /*
   * Function to compare owner keys
   * */
  private isOwnerKeyValid(ownerKey: string): boolean {
    return ownerKey === this.configService.get<string>('OWNER_KEY');
  }

  public async signup(createUserOptions: UserCreateDto) {
    // Destructure values
    const { email, password, firstName, lastName } = createUserOptions;

    //Check if the user exists
    const isUserUnique = await this.isUserUnique(email);
    if (!isUserUnique) {
      throw new ConflictException('The email address is already in use.');
    }

    // Generate a random salt
    const salt = AuthCoreService.generateSalt();

    // Hash password with the salt
    const hashedPassword = await AuthCoreService.generateHash(password, salt);

    // Concatenate and generate final password
    const finalPassword = AuthCoreService.mergeTargetAndSalt(
      hashedPassword,
      salt,
    );

    const newUser: Users = await this.usersCoreService.create({
      email,
      firstName,
      password: finalPassword,
      lastName,
    });


    // Generate the access token
    const accessToken: string = await this.generateJWT({
      email: newUser.email,
    });


    // Return and add the access token to the user object
    return {
      ...newUser['_doc'],
      accessToken: accessToken,
    };
  }
}
