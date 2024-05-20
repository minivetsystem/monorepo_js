import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty, IsOptional,
  IsString
} from "class-validator";
import { Type } from "class-transformer";

export class CreateEducationResultsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  search_id: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  wait_time: number;
}
