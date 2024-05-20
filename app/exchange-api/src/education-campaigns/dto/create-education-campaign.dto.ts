import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString
} from "class-validator";

export class CreateEducationCampaignDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsNotEmpty()
  start_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  commission_percentage: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  buyers: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  vendor: string;
}
