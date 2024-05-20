import { Module } from '@nestjs/common';
import { AuthCoreService } from './auth.core.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersCoreModule } from '../users/users.core.module';

@Module({
  imports: [
    ConfigModule,
    UsersCoreModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: '360000s',
          },
        };
      },
    }),
  ],
  exports: [AuthCoreService, PassportModule, AuthCoreModule],
  providers: [AuthCoreService, ConfigModule],
})
export class AuthCoreModule {}
