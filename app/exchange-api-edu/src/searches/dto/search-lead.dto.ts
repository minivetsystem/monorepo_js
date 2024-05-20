import { IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SearchLeadAddressDto } from "./search-lead-address.dto";
import { SearchLeadEducationDto } from "./search-lead-education.dto";
import { SearchLeadBackgroundDto } from "./search-lead-background.dto";

export class SearchLeadDto {
  /**
   * The phone number of the lead.
   */
  @ApiProperty()
  @IsNotEmpty()
  phone: string;
  /**
   * The valid email of the lead.
   */
  @ApiProperty()
  @IsNotEmpty()
  email: string;
  /**
   * The valid IP of the customer.
   */
  @ApiProperty()
  @IsNotEmpty()
  ip: string;
  /**
   * The valid First Name of the customer.
   */
  @ApiProperty()
  firstname: string;
  /**
   * The valid Last Name of the customer.
   */
  @ApiProperty()
  lastname: string;
  /**
   * The valid gender of the customer.
   */
  @ApiProperty()
  gender: string;
  /**
   * The valid age of the customer.
   */
  @ApiProperty()
  age: number;
  /**
   * The valid date of birth of the customer.
   */
  @ApiProperty()
  dob: Date;
  /**
   * Best time to contact the customer. Should be a value from the following table only else there will be a validation error.
   */
  @ApiProperty()
  besttime_contact: string;
 /*
  * The Jornaya LeadID Token from the short-form data source where the original
  *  lead was generated for the call center to call on.
  */
  @ApiProperty()
  service_leadid: string;
 /*
  * The Jornaya LeadID Token from the short-form data source where the original 
  * lead was generated for the call center to call on.
  */
 @ApiProperty()
  source_service_leadid
  /**
   * Service Trusted Form
   */
  @ApiProperty()
  service_trusted_form: string;
  /**
   * The Trusted Form Certificate from the short-form data source where the original lead was generated for the call center to call on
   */
  @ApiProperty()
  source_service_trusted_form: string;
  /**
   * This is the URL of the site the lead was generated.
   */
  @ApiProperty()
  signup_url: string;
  /**
   * This is the URL of the page on the site where the lead consented to be contacted.
   */
  @ApiProperty()
  consent_url: string;

}
