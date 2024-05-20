import { ApiProperty } from "@nestjs/swagger";
import { EducationMillitaryType } from "../enums/education-millitary-type.enum";
import { IsEnum, IsOptional } from "class-validator";
import { EducationUsCitizenship } from "../enums/education-us-citizenship.enum";
import { EducationInternetPc } from "../enums/education-internet-pc.enum";
import {
  EducationTeachingLicense
} from "../enums/education-teaching-license.enum";
import { EducationRnLicense } from "../enums/education-rn-license.enum";
import {
  EducationEnrolledStatus
} from "../enums/education-enrolled-status.enum";

export class EducationSearchLeadBackgroundDto {
  @ApiProperty({
    enum: EducationMillitaryType
  })
  @IsOptional()
  @IsEnum(EducationMillitaryType)
  military_type?: string;

  @ApiProperty({
    enum: EducationUsCitizenship
  })
  @IsOptional()
  @IsEnum(EducationUsCitizenship)
  us_citizen?: EducationUsCitizenship;

  @ApiProperty({
    enum: EducationInternetPc
  })
  @IsOptional()
  @IsEnum(EducationInternetPc)
  internet_pc?: EducationInternetPc;

  @ApiProperty({
    enum: EducationTeachingLicense
  })
  @IsOptional()
  @IsEnum(EducationTeachingLicense)
  teaching_license?: EducationTeachingLicense;

  @ApiProperty({
    enum: EducationRnLicense
  })
  @IsOptional()
  @IsEnum(EducationRnLicense)
  rn_license?: EducationRnLicense;

  @ApiProperty({
    enum: EducationEnrolledStatus
  })
  @IsOptional()
  @IsEnum(EducationEnrolledStatus)
  enrolled_status?: EducationEnrolledStatus;
}
