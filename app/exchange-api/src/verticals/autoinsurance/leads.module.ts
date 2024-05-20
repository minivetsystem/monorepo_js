import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { HttpModule } from '@nestjs/axios';
import {
  IncomingRequest,
  IncomingRequestSchema,
  LeadType,
  LeadTypeSchema,
  Bid,
  BidSchema,
  Zipcode,
  ZipcodeSchema,
  OutgoingRequest,
  OutgoingRequestSchema,
  ClientReturn,
  ClientReturnSchema,
  BlacklistEmail,
  BlacklistEmailSchema,
  BlacklistPhone,
  BlacklistPhoneSchema,
  BlacklistJornayaId,
  BlacklistJornayaIdSchema,
  Lead,
  LeadSchema,
  IncomingRequestArchieve,
  IncomingRequestArchieveSchema,
  BidArchieve,
  BidArchieveSchema,
  OutgoingRequestArchieve,
  OutgoingRequestArchieveSchema,
  VendorSubID,
  VendorSubIDSchema,
  Ping,
  PingSchema,
  Post,
  PostSchema,
  PingArchieve,
  PingArchieveSchema,
  PostArchieve,
  PostArchieveSchema,
  ClientSentReturn,
  ClientSentReturnSchema
} from './schemas';
import {
  Campaign,
  CampaignSchema,
} from '../../campaigns/schemas';
import {
  ClientVortex,
  ClientVortexSchema,
  User,
  UserSchema,
  VendorLeadTypeSetting,
  VendorLeadTypeSettingSchema,
  VendorVortex,
  VendorVortexSchema
} from '../../users/schemas';
import { VendorService } from './vendor.service';
import { PassportModule } from "@nestjs/passport";
import { Entity, EntitySchema, EntitySetting, EntitySettingSchema, Role, RoleSchema } from '../../auth/schemas';
import { ScheduleModule } from '@nestjs/schedule';
import { AutoVerifyService } from './autoverify.service';
import { ClearRequestsService } from './clearrequests.service';
import { VendorCheckService } from './vendorcheck.service';
import { CaslAbilityFactory } from '../../casl/casl-ability.factory';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    HttpModule,
    ScheduleModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: IncomingRequest.name, schema: IncomingRequestSchema },
      { name: OutgoingRequest.name, schema: OutgoingRequestSchema },
      { name: LeadType.name, schema: LeadTypeSchema },
      { name: Bid.name, schema: BidSchema },
      { name: BidArchieve.name, schema: BidArchieveSchema },
      { name: Campaign.name, schema: CampaignSchema },
      { name: Zipcode.name, schema: ZipcodeSchema },
      { name: VendorLeadTypeSetting.name, schema: VendorLeadTypeSettingSchema },
      { name: Role.name, schema: RoleSchema },
      { name: ClientReturn.name, schema: ClientReturnSchema },
      { name: BlacklistEmail.name, schema: BlacklistEmailSchema },
      { name: BlacklistPhone.name, schema: BlacklistPhoneSchema },
      { name: BlacklistJornayaId.name, schema: BlacklistJornayaIdSchema },
      { name: Lead.name, schema: LeadSchema },
      { name: IncomingRequestArchieve.name, schema: IncomingRequestArchieveSchema },
      { name: OutgoingRequestArchieve.name, schema: OutgoingRequestArchieveSchema },
      { name: BidArchieve.name, schema: BidArchieveSchema },
      { name: VendorSubID.name, schema: VendorSubIDSchema },
      { name: Ping.name, schema: PingSchema },
      { name: Post.name, schema: PostSchema },
      { name: PingArchieve.name, schema: PingArchieveSchema },
      { name: PostArchieve.name, schema: PostArchieveSchema },
      { name: ClientSentReturn.name, schema: ClientSentReturnSchema },
      { name: Entity.name, schema: EntitySchema },
      { name: EntitySetting.name, schema: EntitySettingSchema },
      { name: VendorVortex.name, schema: VendorVortexSchema },
      { name: ClientVortex.name, schema: ClientVortexSchema }
    ]),
  ],
  exports: [PassportModule],
  controllers: [LeadsController],
  providers: [
    LeadsService,
    VendorService,
    AutoVerifyService,
    ClearRequestsService,
    VendorCheckService,
    CaslAbilityFactory,
    AuthService,
    UsersService,
    JwtService
  ],
})
export class LeadsModule {}
