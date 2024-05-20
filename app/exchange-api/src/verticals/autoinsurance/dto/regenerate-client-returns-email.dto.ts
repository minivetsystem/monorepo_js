import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RegenerateClientReturnsEmailDto {

    @ApiProperty()
    @IsNotEmpty()
    history_id: string;

    @ApiProperty()
    @IsNotEmpty()
    added_by: string;
  }