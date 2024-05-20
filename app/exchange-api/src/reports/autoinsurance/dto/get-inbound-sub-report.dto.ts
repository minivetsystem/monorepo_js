import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetInboundSubReportDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  page_size: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  page_offset: number;
  
  @ApiProperty()
  @IsNotEmpty()
  vendor_id: string;

  @ApiProperty()
  @IsNotEmpty()
  from_date: string;

  @ApiProperty()
  @IsNotEmpty()
  to_date: string;
}