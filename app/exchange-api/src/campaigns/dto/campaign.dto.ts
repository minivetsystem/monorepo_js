import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CampaignDto {

  @ApiProperty()
  @IsNotEmpty()
  lead_type_id: string;

  @ApiProperty()
  @IsNotEmpty()
  client_id: string;

  @ApiProperty()
  @IsNotEmpty()
  is_lead_flow_status: boolean;

  @ApiProperty()
  @IsNotEmpty()
  is_allowed_by_ews: boolean;

  @ApiProperty()
  @IsNotEmpty()
  is_accepts_call_center_leads: boolean;

  @ApiProperty()
  @IsNotEmpty()
  is_sends_returns: boolean;

  @ApiProperty()
  @IsNotEmpty()
  min_accepted_quality: string;

  @ApiProperty()
  @IsNotEmpty()
  posting_method: string;

  @ApiProperty()
  @IsNotEmpty()
  ping_test_url: string;

  @ApiProperty()
  @IsNotEmpty()
  ping_live_url: string;

  @ApiProperty()
  @IsNotEmpty()
  post_test_url: string;

  @ApiProperty()
  @IsNotEmpty()
  post_live_url: string;

  @ApiProperty()
  @IsNotEmpty()
  post_header: string;

  @ApiProperty()
  @IsNotEmpty()
  response_method: string;

  @ApiProperty()
  @IsNotEmpty()
  tier: number;

  @ApiProperty()
  @IsNotEmpty()
  posting_time_limit: number;

  @ApiProperty()
  @IsNotEmpty()
  parameter1: string;

  @ApiProperty()
  @IsNotEmpty()
  parameter2: string;

  @ApiProperty()
  @IsNotEmpty()
  parameter3: string;

  @ApiProperty()
  @IsNotEmpty()
  parameter4: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  is_third_party_verification: boolean;

  @ApiProperty()
  @IsNotEmpty()
  is_auto_verify_numbers: boolean;

  @ApiProperty()
  @IsNotEmpty()
  hourly_accepted_post_cap: number;

  @ApiProperty()
  @IsNotEmpty()
  daily_accepted_post_cap: number;

  @ApiProperty()
  @IsNotEmpty()
  daily_ping_cap: number;

  @ApiProperty()
  @IsNotEmpty()
  is_tcpa_shield_active: boolean;

  @ApiProperty()
  @IsNotEmpty()
  max_revenue_limit: number;

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  end_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  bidding_floor_attempt_1: number;

  @ApiProperty()
  @IsNotEmpty()
  bidding_floor_attempt_2: number;

  @ApiProperty()
  @IsNotEmpty()
  bidding_floor_attempt_3: number;

  @ApiProperty()
  @IsNotEmpty()
  bidding_floor_attempt_4: number;

  @ApiProperty()
  @IsNotEmpty()
  bidding_floor_attempt_5: number;

  @ApiProperty()
  @IsNotEmpty()
  adjusted_client_margin: number;

  @ApiProperty()
  @IsNotEmpty()
  notes: string;

  @ApiProperty()
  @IsNotEmpty()
  added_by: string;

  @ApiProperty()
  @IsNotEmpty()
  added_on: Date;

  @ApiProperty()
  @IsNotEmpty()
  updated_by: string;

  @ApiProperty()
  @IsNotEmpty()
  updated_on: Date;
}