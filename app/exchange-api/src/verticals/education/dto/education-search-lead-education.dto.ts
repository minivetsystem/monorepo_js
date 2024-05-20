import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsNotEmpty, IsNumber,
  IsOptional,
  Max, Min
} from "class-validator";
import { EducationLevelId } from "../enums/education-level-id.enum";
import { EducationStartDate } from "../enums/education-start-date.enum";
import {
  EducationLevelOfInterest
} from "../enums/education-level-of-interest.enum";
import { EducationAreaOfStudies } from "../enums/education-area-of-studies";
import { EducationProgramNames } from "../enums/education-program-names.enum";

export class EducationSearchLeadEducationDto {

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(1900)
  @Max(2030)
  grad_year?: number;

  @ApiProperty({
    enum: EducationLevelId
  })
  @IsNotEmpty()
  @IsEnum(EducationLevelId)
  education_level_id: string;

  @ApiProperty({
    enum: EducationStartDate
  })
  @IsOptional()
  @IsEnum(EducationStartDate)
  start_date?: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(3)
  @IsNotEmpty()
  school_type: number;

  @ApiProperty({
    enum: EducationLevelOfInterest
  })
  @IsOptional()
  @IsEnum(EducationLevelOfInterest)
  level_interest?: string;

  @ApiProperty({
    isArray: true,
    enum: EducationAreaOfStudies,
    example: [EducationAreaOfStudies["art-design"], EducationAreaOfStudies["education-teaching"]]
  })
  @IsArray()
  @IsOptional()
  @IsEnum(EducationAreaOfStudies, { each: true })
  area_of_studies?: EducationAreaOfStudies[];


  @ApiProperty({
    isArray: true,
    enum: EducationProgramNames
  })
  @IsArray()
  @IsOptional()
  @IsEnum(EducationProgramNames, { each: true })
  program_names?: EducationProgramNames[];
}

