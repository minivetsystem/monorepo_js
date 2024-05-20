import { ApiProperty } from '@nestjs/swagger';

/**
 * This class represents the dto for the create/edit user.
 */
export class UserDto {
  @ApiProperty()
  first_name: string;

  @ApiProperty()
  middle_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  primary_phone: string;

  @ApiProperty()
  secondary_phone: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  zip: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  user_status: string;

  @ApiProperty()
  is_call_center: boolean;

  @ApiProperty()
  accept_returns: boolean;

  @ApiProperty()
  is_hide_all_leads_reports: boolean;

  @ApiProperty()
  is_io_received: boolean;

  @ApiProperty()
  vendor_lead_quality: string;

  @ApiProperty()
  lead_flow_status: string;

  @ApiProperty()
  is_allowed_by_ews: boolean;

  @ApiProperty()
  is_trusted_form_claim_enabled: boolean;

  @ApiProperty()
  payment_method: string;

  @ApiProperty()
  is_return_reminder_email: boolean;

  @ApiProperty()
  prepays: boolean;

  @ApiProperty()
  main_email_list: string;

  @ApiProperty()
  tech_email_list: string;

  @ApiProperty()
  returns_email_list: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  added_by: string;
}
