import { ApiProperty } from '@nestjs/swagger';

export class UpdateCampaignDto {

  @ApiProperty()
  campaign_name: string;

  @ApiProperty()
  client_handler_name: string;

  @ApiProperty()
  campaign_status: string;

  @ApiProperty()
  lead_type_id: string;

  @ApiProperty()
  client_id: string;

  @ApiProperty()
  is_lead_flow_status: boolean;

  @ApiProperty()
  is_allowed_by_ews: boolean;

  @ApiProperty()
  is_accepts_call_center_leads: boolean;

  @ApiProperty()
  vendors: string[];

  @ApiProperty()
  is_sends_returns: boolean;

  @ApiProperty()
  min_accepted_quality: string;

  @ApiProperty()
  posting_method: string;

  @ApiProperty()
  ping_test_url: string;

  @ApiProperty()
  ping_live_url: string;

  @ApiProperty()
  post_test_url: string;

  @ApiProperty()
  post_live_url: string;

  @ApiProperty()
  post_header: string;

  @ApiProperty()
  response_method: string;

  @ApiProperty()
  tier: number;

  @ApiProperty()
  posting_time_limit: number;

  @ApiProperty()
  parameter1: string;

  @ApiProperty()
  parameter2: string;

  @ApiProperty()
  parameter3: string;

  @ApiProperty()
  parameter4: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  is_third_party_verification: boolean;

  @ApiProperty()
  is_auto_verify_numbers: boolean;

  @ApiProperty()
  hourly_accepted_post_cap: number;

  @ApiProperty()
  daily_accepted_post_cap: number;

  @ApiProperty()
  daily_ping_cap: number;

  @ApiProperty()
  is_tcpa_shield_active: boolean;

  @ApiProperty()
  max_revenue_limit: number;

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  end_date: Date;

  @ApiProperty()
  bidding_floor_attempt_1: number;

  @ApiProperty()
  bidding_floor_attempt_2: number;

  @ApiProperty()
  bidding_floor_attempt_3: number;

  @ApiProperty()
  bidding_floor_attempt_4: number;

  @ApiProperty()
  bidding_floor_attempt_5: number;

  @ApiProperty()
  adjusted_client_margin: number;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  updated_by: string;
}