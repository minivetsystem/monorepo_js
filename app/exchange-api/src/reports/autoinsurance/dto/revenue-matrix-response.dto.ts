import { ApiProperty } from "@nestjs/swagger";
import { LeadTypeDto, RevenueMatrixMainSummaryResponseDto, RevenueMatrixMainDayResponseDto } from './index';

export class RevenueMatrixResponseDto {

    @ApiProperty()
    normal_day_data: RevenueMatrixMainDayResponseDto [];

    @ApiProperty()
    best_day_data: RevenueMatrixMainDayResponseDto;

    @ApiProperty()
    last_same_day_data: RevenueMatrixMainDayResponseDto;

    @ApiProperty()
    main_data_summary: RevenueMatrixMainSummaryResponseDto;

    @ApiProperty()
    lead_types: LeadTypeDto [];

    @ApiProperty()
    lead_type_data: any;

    @ApiProperty()
    daily_average: string;

    @ApiProperty()
    month_forecast: string;

    @ApiProperty()
    display_comparison: boolean;

    @ApiProperty()
    last_updated: string;
}