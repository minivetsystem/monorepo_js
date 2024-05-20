import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

class PostLeadEducation {
  /**
   * Selected campus form the selected offer
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  campus_id: number;

  /**
   * Selected program from the selected campus
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  program_id: number;

  /**
   * Selected offers recommended fields
   */
  [key: string]: any;
}

class PostOfferParams {
  [key: string]: any;
}

/**
 * This represents the dto for the Offer post request.
 */
export class PostRequestDto {
  /**
   * Offer search result id
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  result_id: number;
  /**
   * Represents the lead education
   */
  @ApiProperty()
  @IsNotEmpty()
  lead_education: PostLeadEducation;
  /**
  * Represents the lead consent
  */
  @ApiProperty()
  lead_consent: any;
  /**
  * Search lead object
  */
  @ApiProperty()
  lead: PostOfferParams;
  /**
   * Represents the lead address
   */
  @ApiProperty()
  lead_address: PostOfferParams;
  /**
   * Represents the lead background
   */
  @ApiProperty()
  lead_background: PostOfferParams;
}
