import { ApiProperty } from "@nestjs/swagger";

export class RevenueMatrixMainDayResponseDto {
    @ApiProperty()
    row_no: number;

    @ApiProperty()
    date: string;

    @ApiProperty()
    total_gross_revenue: string;

    @ApiProperty()
    total_gross_revenue_diff: string;

    @ApiProperty()
    total_gross_revenue_show_up_arrow: boolean;

    @ApiProperty()
    net_revenue_after_returns: string;

    @ApiProperty()
    net_revenue_after_returns_diff: string;

    @ApiProperty()
    net_revenue_after_returns_show_up_arrow: boolean;

    @ApiProperty()
    total_net_revenue: string;

    @ApiProperty()
    total_commission: string;

    @ApiProperty()
    total_commission_diff: string;

    @ApiProperty()
    total_commission_show_up_arrow: boolean;

    @ApiProperty()
    total_returns_received: string;

    @ApiProperty()
    total_net_profit: string;

    @ApiProperty()
    total_percentage: string;

    @ApiProperty()
    is_best: boolean;

    @ApiProperty()
    row_class: string;
}