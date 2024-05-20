import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { HttpModule } from '@nestjs/axios';
import {
  Campaign,
  CampaignSchema,
} from './schemas';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ClientVortex, ClientVortexSchema, User, UserSchema, VendorLeadTypeSetting, VendorLeadTypeSettingSchema, VendorVortex, VendorVortexSchema } from '../users/schemas';
import { Entity, EntitySchema, EntitySetting, EntitySettingSchema, Role, RoleSchema } from '../auth/schemas';
import { LeadType, LeadTypeSchema, VendorSubID, VendorSubIDSchema } from '../verticals/autoinsurance/schemas';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Campaign.name, schema: CampaignSchema },
      { name: User.name, schema: UserSchema },
      { name: Entity.name, schema: EntitySchema },
      { name: EntitySetting.name, schema: EntitySettingSchema },
      { name: Role.name, schema: RoleSchema },
      { name: LeadType.name, schema: LeadTypeSchema },
      { name: VendorLeadTypeSetting.name, schema: VendorLeadTypeSettingSchema },
      { name: VendorVortex.name, schema: VendorVortexSchema },
      { name: ClientVortex.name, schema: ClientVortexSchema },
      { name: VendorSubID.name, schema: VendorSubIDSchema }
    ]),
  ],
  controllers: [CampaignsController],
  providers: [CampaignsService, CaslAbilityFactory, AuthService, JwtService, UsersService],
})
export class CampaignModule {}
