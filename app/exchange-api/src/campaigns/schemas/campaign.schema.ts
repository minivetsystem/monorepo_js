import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from "mongoose";
import { User } from '../../users/schemas';
import { LeadType } from '../../verticals/autoinsurance/schemas';

export type CampaignDocument = HydratedDocument<Campaign>;

@Schema({ versionKey: false })
export class Campaign {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  campaign_name: string;

  @Prop()
  campaign_status: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'LeadType' })
  lead_type: LeadType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  client: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  vendors: User[];

  @Prop()
  client_handler: string;

  @Prop()
  is_lead_flow_status: boolean;

  @Prop()
  is_allowed_by_ews: boolean;

  @Prop()
  is_accepts_call_center_leads: boolean;

  @Prop()
  is_sends_returns: boolean;

  @Prop()
  min_accepted_quality: string;

  @Prop()
  posting_method: string;

  @Prop()
  ping_test_url: string;

  @Prop()
  ping_live_url: string;

  @Prop()
  post_test_url: string;

  @Prop()
  post_live_url: string;

  @Prop()
  search_test_url: string;

  @Prop()
  search_live_url: string;

  @Prop()
  lead_test_url: string;

  @Prop()
  lead_live_url: string;

  @Prop()
  results_test_url: string;

  @Prop()
  results_live_url: string;

  @Prop()
  post_header: string;

  @Prop()
  response_method: string;

  @Prop()
  tier: number;

  @Prop()
  posting_time_limit: number;

  @Prop()
  parameter1: string;

  @Prop()
  parameter2: string;

  @Prop()
  parameter3: string;

  @Prop()
  parameter4: string;

  @Prop()
  price: number;

  @Prop()
  is_third_party_verification: boolean;

  @Prop()
  is_auto_verify_numbers: boolean;

  @Prop()
  hourly_accepted_post_cap: number;

  @Prop()
  daily_accepted_post_cap: number;

  @Prop()
  daily_ping_cap: number;

  @Prop()
  is_tcpa_shield_active: boolean;

  @Prop()
  max_revenue_limit: number;

  @Prop()
  start_date: Date;

  @Prop()
  end_date: Date;

  @Prop()
  bidding_floor_attempt_1: number;

  @Prop()
  bidding_floor_attempt_2: number;

  @Prop()
  bidding_floor_attempt_3: number;

  @Prop()
  bidding_floor_attempt_4: number;

  @Prop()
  bidding_floor_attempt_5: number;

  @Prop()
  adjusted_client_margin: number;

  @Prop()
  notes: string;

  @Prop()
  added_on: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  added_by: User;

  @Prop()
  updated_on: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updated_by: User;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
