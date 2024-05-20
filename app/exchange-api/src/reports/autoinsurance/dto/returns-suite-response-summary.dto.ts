import { ApiProperty } from "@nestjs/swagger";


export class ReturnsSuiteResponseSummaryDto {

    @ApiProperty()
    row_no: number;

    @ApiProperty()
    lead_type_id: number;

    @ApiProperty()
    lead_type: number;

    @ApiProperty()
    vendor_id: string;

    @ApiProperty()
    vendor_name: string;

    @ApiProperty()
    vendor_returns_emails: string;

    @ApiProperty()
    total_leads: number;

    @ApiProperty()
    total_return_leads: number;

    @ApiProperty()
    total_return_leads_sent: number;

    @ApiProperty()
    total_return_leads_not_sent: number;

    @ApiProperty()
    return_rate: string;

    @ApiProperty()
    total_return_vendor_price: string;

    @ApiProperty()
    total_return_client_price: string;

    @ApiProperty()
    show_generate_link: boolean;

}