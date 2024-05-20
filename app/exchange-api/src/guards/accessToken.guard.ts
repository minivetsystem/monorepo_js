import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class AccessTokenGuard implements CanActivate {
    constructor(private jwtService: JwtService, private configService: ConfigService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('User is not authorised.');
      };

      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET')
          }
        );
        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;
      } catch (err) {
        if(err.toString().indexOf('jwt expired')) {
            throw new UnauthorizedException('jwt expired');
        } else {
            throw new UnauthorizedException('User is not authorised.');
        }
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }