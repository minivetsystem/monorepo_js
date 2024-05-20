import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { JwtPayloadInterface } from '../auth/interfaces/jwt-payload.interface';
import { User } from '../users/schemas';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UsersService,private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: JwtPayloadInterface) {
    const { username } = payload;
    const user: User = await this.userService.getUserByUsername(username);

    // Throw an exception if the user doesn't exist
    if (!user) {
      throw new UnauthorizedException('User is not authorised.');
    }

    return user;
  }
}