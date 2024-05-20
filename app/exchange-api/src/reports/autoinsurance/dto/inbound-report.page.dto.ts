import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InboundReportDto } from './inbound-report.dto';

export class InboundReportPageDto {

   constructor(data: InboundReportDto[], totalPages: number) {
    this.totalPages = totalPages;
    this.data = data;
   }

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  nextPageOffset: number;

  @ApiProperty()
  @IsNotEmpty()
  data: InboundReportDto[];

}