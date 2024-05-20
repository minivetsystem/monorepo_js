import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsISO8601, IsNumber,
  IsOptional,
  IsString
} from "class-validator";
import { Type } from "class-transformer";
import moment from "moment-timezone";


export class AllSearchQueryDto {
  @ApiProperty({
    description: "If you do not pass a start date the default is set to the" +
      " first" +
      " day of the current month. Pass all dates in ISO date String" +
      " format and do a UTC offset by -06:00",
    required: false
  })
  @IsISO8601()
  @IsOptional()
  start_date?: string = moment().startOf("month").utcOffset("-06:00").toISOString();

  @ApiProperty({
    description: "If you do not pass an end date the default is set to the" +
      " current timestamp.  Pass all dates in ISO date String" +
      " format and do a UTC offset by -06:00",
    required: false
  })
  @IsISO8601()
  @IsOptional()
  end_date?: string = moment().utcOffset("-06:00").toISOString();

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsString()
  campaign_id?: string;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  @IsString()
  vendor_id?: string;

  @ApiProperty({
    description: "The number of entries you want to have per page while" +
      " pagination. By default the value is set to 10",
    required: false,
    example: 10
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    description: "The number of pages you want to skip while doing" +
      " pagination. By default the value is set to 0. You use the value 0 to" +
      " see the first page and 1 to see the" +
      " second page.",
    example: 0,
    required: false
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  skip?: number;
}
