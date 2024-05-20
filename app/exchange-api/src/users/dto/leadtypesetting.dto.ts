import { ApiProperty } from '@nestjs/swagger';

export class LeadTypeSettingDto {

  @ApiProperty()
  _id: string;

  @ApiProperty()
  lead_type: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  lead_flow_status: string;

  @ApiProperty()
  payment_model: string;

  @ApiProperty()
  rev_share: number;

  @ApiProperty()
  vendor_min_payout_cap: number;

  @ApiProperty()
  vendor_max_payout_cap: number;

  @ApiProperty()
  tcpa_text: string;

  @ApiProperty()
  is_tcpa_text_active: boolean;

  @ApiProperty()
  daily_accepted_cap: number;

  @ApiProperty()
  is_daily_auto_verify_email: boolean;

  @ApiProperty()
  is_bla_dnc_active: boolean;

  @ApiProperty()
  is_litigator_active: boolean;

  @ApiProperty()
  is_the_blacklist_tcpa_litigator_active: boolean;

  @ApiProperty()
  max_pings_per_min_cap: number;

  @ApiProperty()
  max_ping_time: number;

  @ApiProperty()
  max_post_time: number;

  @ApiProperty()
  is_enable_auto_resubmit: boolean;
}
