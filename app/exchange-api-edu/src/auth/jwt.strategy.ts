import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { User } from '../users/schemas';
import { ConfigService } from '@nestjs/config';

/**
 * This class is used for authentication using bearer token.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Constructor for the class.
   * @param userService instance of user service.
   * @param configService instance of config service.
   */
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get<string>('jwtSecret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  /**
   * The mandatory validate method for the strategy
   * @param payload payload data
   */
  async validate(payload: JwtPayloadInterface): Promise<any> {
    const { email } = payload;
    const user: User = await this.userService.getUserByEmail(email);

    // Throw an exception if the user doesn't exist
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
