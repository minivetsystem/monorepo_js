import { ApiProperty } from '@nestjs/swagger';

export class SearchLeadBackgroundDto {
  /**
   * Is the student affiliated to military? Are you affiliated with the Military?
   */
  @ApiProperty()
  military_type: string;
  /**
   * Is the student a citizen of the United States? Are you a Citizen of the United States?
   */
  @ApiProperty()
  us_citizen: string;
  /**
   * Do you own a PC with unrestricted reliable internet access?
   */
  @ApiProperty()
  internet_pc: string;
  /**
   * Do you possess a current and valid teaching license?
   */
  @ApiProperty()
  teaching_license: string;
  /**
   * Do you possess a current and valid teaching license?
   */
  @ApiProperty()
  rn_license: string;
  /**
   * Are you already enrolled in college?
   */
  @ApiProperty()
  enrolled_status: string;
}
