import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class SendClientReturnsEmailDto {

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Number)
    return_month: number;
  
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Number)
    return_year: number;

    @ApiProperty()
    @IsNotEmpty()
    lead_type_id: string;

    @ApiProperty()
    @IsNotEmpty()
    vendor_id: string;

    @ApiProperty()
    @IsNotEmpty()
    added_by: string;
  }