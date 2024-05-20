import { IsBoolean, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { SearchLeadDto } from "./search-lead.dto";
import { SearchLeadAddressDto } from "./search-lead-address.dto";
import { SearchLeadEducationDto } from "./search-lead-education.dto";
import { SearchLeadBackgroundDto } from "./search-lead-background.dto";

/**
 * This represents the dto for the search request.
 */
export class SearchRequestDto {
  /**
   * Mode for the search.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  test: boolean;
  /**
   * Partner code for the vendor.
   */
  @ApiProperty()
  @IsNotEmpty()
  partner_code: string;
  /**
   * Search lead object
   */
  @ApiProperty()
  @IsNotEmpty()
  lead: SearchLeadDto;
  /**
   * Represents the lead address
   */
  @ApiProperty()
  @IsNotEmpty()
  lead_address: SearchLeadAddressDto;
  /**
   * Represents the lead education
   */
  @ApiProperty()
  @IsNotEmpty()
  lead_education: SearchLeadEducationDto;
  /**
   * Represents the lead background
   */
  @ApiProperty()
  lead_background: SearchLeadBackgroundDto;
}
