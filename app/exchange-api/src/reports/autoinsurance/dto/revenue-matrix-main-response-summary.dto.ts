import { ApiProperty } from "@nestjs/swagger";


export class RevenueMatrixMainSummaryResponseDto {

    @ApiProperty()
    row_no: number;

    @ApiProperty()
    total_gross_revenue: string;

    @ApiProperty()
    total_returns_received: string;

    @ApiProperty()
    net_revenue_after_returns: string;

    @ApiProperty()
    total_commission: string;

    @ApiProperty()
    total_net_profit: string;

    @ApiProperty()
    total_percentage: string;
}