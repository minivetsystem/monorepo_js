import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetCommissionsReportDto {

  @ApiProperty()
  @IsNotEmpty()
  start_date: string;

  @ApiProperty()
  @IsNotEmpty()
  end_date: string;
  
}