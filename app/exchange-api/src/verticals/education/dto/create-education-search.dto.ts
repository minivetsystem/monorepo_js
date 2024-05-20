import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty, IsOptional,
  IsString, ValidateNested
} from "class-validator";

/*
* User Created Modules
* */
import {
  CreateEducationSearchLeadDto
} from "./create-education-search-lead.dto";
import { Type } from "class-transformer";
import {
  EducationSearchLeadAddressDto
} from "./education-search-lead-address.dto";
import {
  EducationSearchLeadEducationDto
} from "./education-search-lead-education.dto";
import {
  EducationSearchLeadBackground
} from "../schema/education-search-lead-background.schema";

export class CreateEducationSearchDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  education_campaign_id: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  test?: boolean;

  @ApiProperty()
  @IsString()
  @IsOptional()
  subid?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  subid2?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  subid3?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  subid4?: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => CreateEducationSearchLeadDto)
  lead: CreateEducationSearchLeadDto;

  @ApiProperty()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => EducationSearchLeadAddressDto)
  lead_address: EducationSearchLeadAddressDto;

  @ApiProperty()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => EducationSearchLeadEducationDto)
  lead_education: EducationSearchLeadEducationDto;

  @ApiProperty()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => EducationSearchLeadBackground)
  lead_background: EducationSearchLeadBackground;
}
