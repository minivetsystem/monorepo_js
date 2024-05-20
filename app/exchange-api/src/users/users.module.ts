import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
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
} from './schemas';
import {
  Entity,
  EntitySchema,
  EntitySetting,
  EntitySettingSchema,
  Permission,
  PermissionSchema,
  Role,
  RoleSchema
} from "../auth/schemas";
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { LeadType, LeadTypeSchema, VendorSubID, VendorSubIDSchema } from '../verticals/autoinsurance/schemas';
import { Campaign, CampaignSchema } from '../campaigns/schemas';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Entity.name, schema: EntitySchema },
      { name: EntitySetting.name, schema: EntitySettingSchema },
      { name: VendorLeadTypeSetting.name, schema: VendorLeadTypeSettingSchema },
      { name: LeadType.name, schema: LeadTypeSchema },
      { name: VendorVortex.name, schema: VendorVortexSchema },
      { name: Campaign.name, schema: CampaignSchema },
      { name: ClientVortex.name, schema: ClientVortexSchema },
      { name: VendorSubID.name, schema: VendorSubIDSchema }
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, CaslAbilityFactory, AuthService, JwtService],
  exports:[UsersService, MongooseModule]
})
export class UsersModule { }
