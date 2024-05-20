import { Global, Module } from "@nestjs/common";
import { SettingsService } from './settings.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from "@nestjs/mongoose";
import { Setting, SettingSchema } from "./schemas";
import { SettingsController } from "./settings.controller";
import { CaslAbilityFactory } from "../casl/casl-ability.factory";
import { AuthService } from "../auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { ClientVortex, ClientVortexSchema, User, UserSchema, VendorLeadTypeSetting, VendorLeadTypeSettingSchema, VendorVortex, VendorVortexSchema } from "../users/schemas";
import { Entity, EntitySchema, EntitySetting, EntitySettingSchema, Role, RoleSchema } from "../auth/schemas";
import { UsersService } from "../users/users.service";
import { LeadType, LeadTypeSchema, VendorSubID, VendorSubIDSchema } from "../verticals/autoinsurance/schemas";
import { Campaign, CampaignSchema } from "../campaigns/schemas";

@Global()
@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Setting.name, schema: SettingSchema },
      { name: User.name, schema: UserSchema },
      { name: Entity.name, schema: EntitySchema },
      { name: EntitySetting.name, schema: EntitySettingSchema },
      { name: VendorLeadTypeSetting.name, schema: VendorLeadTypeSettingSchema },
      { name: LeadType.name, schema: LeadTypeSchema },
      { name: Role.name, schema: RoleSchema },
      { name: VendorVortex.name, schema: VendorVortexSchema },
      { name: Campaign.name, schema: CampaignSchema },
      { name: ClientVortex.name, schema: ClientVortexSchema },
      { name: VendorSubID.name, schema: VendorSubIDSchema }
    ]),
  ],
  exports: [SettingsService],
  controllers: [SettingsController],
  providers: [
    UsersService,
    SettingsService,
    CaslAbilityFactory, AuthService, JwtService],
})
export class SettingsModule { }