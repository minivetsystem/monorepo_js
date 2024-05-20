import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class GetEducationCampaignsDto {
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
