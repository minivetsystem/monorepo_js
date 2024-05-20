import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty, IsNumber, IsOptional,
  IsString, ValidateNested
} from "class-validator";
import { Type } from "class-transformer";
import { CreateLeadRequestLeadEducationDto} from "./create-lead-request-lead-education.dto";

export class CreateLeadRequestsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  result_search_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  result_id: number;

  @ApiProperty()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  @Type(() => CreateLeadRequestLeadEducationDto)
  lead_education: CreateLeadRequestLeadEducationDto;
}
