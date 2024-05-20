import { KPISummaryDto } from "./kpi-summary.dto";

export class KPISummaryResponseDto {
    start_date: string;

    data: KPISummaryDto [];
}