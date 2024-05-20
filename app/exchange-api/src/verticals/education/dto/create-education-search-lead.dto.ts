import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail, IsEnum, IsIP,
  IsNotEmpty, IsNumber, IsOptional,
  IsString, IsUrl
} from "class-validator";

/*
* User created modules
* */
import { Gender } from "../enums/gender.enum";
import { IsValidDateFormat } from "../../autoinsurance/dto/ping.dto";
import { BestTimeContact } from "../enums/best-time-contact.enum";


export class CreateEducationSearchLeadDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIP()
  ip: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  firstname?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiProperty({
    description: "The valid gender of the customer. Can be either 'M' | 'F'",
    enum: Gender
  })
  @IsOptional()
  @IsEnum(Gender)
  gender?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty()
  @IsOptional()
  @IsValidDateFormat({
    message: "Invalid date format, should be in format" +
      " YYYY-MM-DD"
  })
  dob?: string;

  @ApiProperty({
    enum: BestTimeContact
  })
  @IsOptional()
  @IsEnum(BestTimeContact)
  besttime_contact?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  service_leadid: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  source_service_leadid?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  service_trusted_form?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  source_service_trusted_form?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  signup_url?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  consent_url?: string;
}
