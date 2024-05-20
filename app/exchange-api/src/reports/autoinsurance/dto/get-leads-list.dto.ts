import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetLeadsListDto {

    @ApiProperty()
    @IsNotEmpty()
    lead_type_id: number;

    @ApiProperty()
    @IsNotEmpty()
    start_date: string;

    @ApiProperty()
    @IsNotEmpty()
    end_date: string;

    @ApiProperty()
    @IsOptional()
    vendor_id: string;

    @ApiProperty()
    @IsOptional()
    client_id: string;

    @ApiProperty()
    @IsOptional()
    search_text: string;

    @ApiProperty()
    @IsOptional()
    lead_status: string;

    @ApiProperty()
    @IsOptional()
    request_type: string;

    @ApiProperty()
    @IsNotEmpty()
    rejection_reason_type: string;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Number)
    lead_mode: number;

}