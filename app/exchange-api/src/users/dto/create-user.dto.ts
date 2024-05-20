import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

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
  @IsNotEmpty()
  role: string;

  @ApiProperty()
  @IsNotEmpty()
  added_by: string;

  @ApiProperty({required: false})
  leadhoop_partner_code?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  leadhoop_partner_username?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  leadhoop_partner_password?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNumber()
  leadhoop_vendor_comission?: number;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  leadhoop_service_url?: string;
}
