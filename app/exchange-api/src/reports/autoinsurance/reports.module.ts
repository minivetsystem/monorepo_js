import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { HttpModule } from '@nestjs/axios';
import { CaslAbilityFactory } from '../../casl/casl-ability.factory';
import { AuthService } from '../../auth/auth.service';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ClientVortex, ClientVortexSchema, User, UserSchema, VendorLeadTypeSetting, VendorLeadTypeSettingSchema, VendorVortex, VendorVortexSchema } from '../../users/schemas';
import { Bid, BidSchema, BidArchieve, BidArchieveSchema, IncomingRequestArchieve, IncomingRequestArchieveSchema, IncomingRequest, IncomingRequestSchema, LeadType, LeadTypeSchema, OutgoingRequest, OutgoingRequestSchema, Ping, PingSchema, Post, PostSchema, VendorSubID, VendorSubIDSchema, ClientReturnSchema, ClientReturn, ClientSentReturn, ClientSentReturnSchema, Lead, LeadSchema } from '../../verticals/autoinsurance/schemas';
import { Entity, EntitySchema, EntitySetting, EntitySettingSchema, Role, RoleSchema } from '../../auth/schemas';
import { Campaign, CampaignSchema } from '../../campaigns/schemas';
import { AutoInsuranceAcceptedPost, AutoInsuranceAcceptedPostSchema, AutoInsuranceBid, AutoInsuranceBidSchema, AutoInsuranceKPIRevenueDetail, AutoInsuranceKPIRevenueDetailSchema, AutoInsuranceOutPing, AutoInsuranceOutPingSchema, AutoInsuranceOutPost, AutoInsuranceOutPostSchema, AutoInsurancePing, AutoInsurancePingSchema, AutoInsurancePingsForBid, AutoInsurancePingsForBidSchema, AutoInsurancePost, AutoInsurancePostSchema } from './schemas';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: LeadType.name, schema: LeadTypeSchema },
      { name: Entity.name, schema: EntitySchema },
      { name: EntitySetting.name, schema: EntitySettingSchema },
      { name: VendorLeadTypeSetting.name, schema: VendorLeadTypeSettingSchema },
      { name: VendorVortex.name, schema: VendorVortexSchema },
      { name: Role.name, schema: RoleSchema },
      { name: IncomingRequest.name, schema: IncomingRequestSchema },
      { name: IncomingRequestArchieve.name, schema: IncomingRequestArchieveSchema },
      { name: OutgoingRequest.name, schema: OutgoingRequestSchema },
      { name: Bid.name, schema: BidSchema },
      { name: BidArchieve.name, schema: BidArchieveSchema },
      { name: Campaign.name, schema: CampaignSchema },
      { name: ClientVortex.name, schema: ClientVortexSchema },
      { name: AutoInsurancePing.name, schema: AutoInsurancePingSchema },
      { name: AutoInsuranceOutPing.name, schema: AutoInsuranceOutPingSchema },
      { name: AutoInsurancePingsForBid.name, schema: AutoInsurancePingsForBidSchema },
      { name: AutoInsurancePost.name, schema: AutoInsurancePostSchema },
      { name: AutoInsuranceOutPost.name, schema: AutoInsuranceOutPostSchema },
      { name: AutoInsuranceBid.name, schema: AutoInsuranceBidSchema },
      { name: AutoInsuranceAcceptedPost.name, schema: AutoInsuranceAcceptedPostSchema },
      { name: AutoInsuranceKPIRevenueDetail.name, schema: AutoInsuranceKPIRevenueDetailSchema },
      { name: Ping.name, schema: PingSchema },
      { name: Post.name, schema: PostSchema },
      { name: VendorSubID.name, schema: VendorSubIDSchema },
      { name: ClientReturn.name, schema: ClientReturnSchema },
      { name: ClientSentReturn.name, schema: ClientSentReturnSchema },
      { name: Lead.name, schema: LeadSchema }
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService, CaslAbilityFactory, AuthService, JwtService, UsersService],
})
export class ReportsModule { }
