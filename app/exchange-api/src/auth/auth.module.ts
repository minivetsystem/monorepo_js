import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";
import {
  ClientVortex,
  ClientVortexSchema,
  User,
  UserSchema,
  VendorLeadTypeSetting,
  VendorLeadTypeSettingSchema,
  VendorVortex,
  VendorVortexSchema
} from "../users/schemas";
import { HttpModule } from "@nestjs/axios";
import { AccessTokenStrategy } from '../strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '../strategies/refreshToken.strategy';
import { Entity, EntitySchema, EntitySetting, EntitySettingSchema, Role, RoleSchema } from './schemas';
import { LeadType, LeadTypeSchema, VendorSubID, VendorSubIDSchema } from '../verticals/autoinsurance/schemas';
import { Campaign, CampaignSchema } from '../campaigns/schemas';

@Module({
  providers: [AuthService, UsersService, AccessTokenStrategy, RefreshTokenStrategy,],
  controllers: [AuthController],
  exports: [AuthService, PassportModule, AuthModule],
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Entity.name, schema: EntitySchema },
      { name: EntitySetting.name, schema: EntitySettingSchema },
      { name: Role.name, schema: RoleSchema },
      { name: VendorLeadTypeSetting.name, schema: VendorLeadTypeSettingSchema },
      { name: LeadType.name, schema: LeadTypeSchema },
      { name: VendorVortex.name, schema: VendorVortexSchema },
      { name: Campaign.name, schema: CampaignSchema },
      { name: ClientVortex.name, schema: ClientVortexSchema },
      { name: VendorSubID.name, schema: VendorSubIDSchema }
    ]),
    HttpModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ],
})
export class AuthModule { }
