import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetRequestsByReasonReportDto {
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
  from_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  to_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  reason: string;

  @ApiProperty()
  @IsNotEmpty()
  vendor_id: string;
}