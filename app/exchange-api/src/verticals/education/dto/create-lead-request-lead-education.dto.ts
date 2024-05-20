import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber } from "class-validator";
import { Type } from "class-transformer";

export class CreateLeadRequestLeadEducationDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  program_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  campus_id: number;
}
