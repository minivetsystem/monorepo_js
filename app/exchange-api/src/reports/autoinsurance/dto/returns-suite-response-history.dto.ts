import { ApiProperty } from "@nestjs/swagger";


export class ReturnsSuiteResponseHistoryDto {

    @ApiProperty()
    row_no: number;

    @ApiProperty()
    lead_type: string;

    @ApiProperty()
    vendor_id: string;

    @ApiProperty()
    vendor_name: string;

    @ApiProperty()
    returns_period: string;

    @ApiProperty()
    generated_on: string;

    @ApiProperty()
    generated_by: string;

    @ApiProperty()
    sent_to: string;

    @ApiProperty()
    no_of_leads: number;
}