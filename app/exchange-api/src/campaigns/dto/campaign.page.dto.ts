import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Campaign } from '../schemas';

export class CampaignPageDto {

   constructor(data: Campaign[], totalPages: number) {
    this.totalPages = totalPages;
    this.campaigns = data;
   }

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  nextPageOffset: number;

  @ApiProperty()
  @IsNotEmpty()
  campaigns: Campaign[];

}