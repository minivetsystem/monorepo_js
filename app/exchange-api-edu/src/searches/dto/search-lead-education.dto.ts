import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchLeadEducationDto {
  /**
   * Year of High School Diploma or GED
   */
  @ApiProperty()
  @IsNumber()
  grad_year: string;
  /**
   * Highest Education Level ID. Below table highlights the possible values for education levels.
   */
  @ApiProperty()
  education_level_id: string;
  /**
   * Student's Desired Start Date
   */
  @ApiProperty()
  start_date: Date;
  /**
   * Student's Desired Campus Type
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  school_type: string;
  /**
   * Student's Level of Interest
   */
  @ApiProperty()
  level_interest: string;
  /**
   * Multiple area's of studies that the student is intrested to pursue.
   */
  @ApiProperty()
  area_of_studies: string[];
  /**
   * Multiple program names student is interested in undertaking.
   */
  @ApiProperty()
  program_names: string[];
}
