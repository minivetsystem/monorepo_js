import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetInboundReportDto {
  @ApiProperty()
  @IsNotEmpty()
  page_size: number;

  @ApiProperty()
  @IsNotEmpty()
  page_offset: number;

  @ApiProperty()
  @IsNotEmpty()
  request_type: string;

  @ApiProperty()
  @IsNotEmpty()
  start_date: string;

  @ApiProperty()
  @IsNotEmpty()
  end_date: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  lead_mode: string;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  lead_type_id: number;

  @ApiProperty()
  @IsOptional()
  vendor_id: string;
}