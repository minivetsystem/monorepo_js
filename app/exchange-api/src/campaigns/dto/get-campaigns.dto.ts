import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetCampaignsDto {
  @ApiProperty()
  @IsNotEmpty()
  page_size: number;

  @ApiProperty()
  @IsNotEmpty()
  page_offset: number;

  @ApiProperty()
  @IsNotEmpty()
  sort: any;

  @ApiProperty()
  @IsNotEmpty()
  filters: any;
}