import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";
import {
  User,
  UserSchema
} from "../users/schemas";
import { HttpModule } from "@nestjs/axios";
import { Vendor, VendorSchema } from '../vendors/schemas';
import { VendorApiKey, VendorApiKeySchema } from '../vendors/schemas';
import { Entity, EntitySchema, Permission, PermissionSchema, Role, RoleSchema } from '../auth/schemas';
import { ProfileTab, ProfileTabSchema } from '../auth/schemas';
import { ProfileTabSetting, ProfileTabSettingSchema } from '../auth/schemas';
import { EntitySetting, EntitySettingSchema } from '../auth/schemas';

@Module({
  providers: [AuthService, UsersService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, PassportModule, AuthModule],
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Vendor.name, schema: VendorSchema },
      { name: Entity.name, schema: EntitySchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
      { name: VendorApiKey.name, schema: VendorApiKeySchema },
      { name: ProfileTab.name, schema: ProfileTabSchema },
      { name: ProfileTabSetting.name, schema: ProfileTabSettingSchema },
      { name: EntitySetting.name, schema: EntitySettingSchema },
    ]),
    HttpModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwtSecret'),
          signOptions: {
            expiresIn: '360000s',
          },
        };
      },
    }),
  ],
})
export class AuthModule {}
