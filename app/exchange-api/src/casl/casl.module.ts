import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
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
import { CaslAbilityFactory } from "./casl-ability.factory";
import { AuthService } from "../auth/auth.service";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { Entity, EntitySchema, EntitySetting, EntitySettingSchema, Role, RoleSchema } from '../auth/schemas';
import { LeadType, LeadTypeSchema, VendorSubID, VendorSubIDSchema } from '../verticals/autoinsurance/schemas';
import { Campaign, CampaignSchema } from '../campaigns/schemas';

@Module({
  imports: [
    HttpModule,
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
  ],
  controllers: [],
  providers: [CaslAbilityFactory, AuthService, UsersService, JwtService],
  exports: [CaslAbilityFactory],
})
export class CaslModule { }
