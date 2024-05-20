import { ApiProperty } from "@nestjs/swagger";
import { ReturnsSuiteResponseSummaryDto } from "./returns-suite-response-summary.dto";
import { ReturnsSuiteResponseHistoryDto } from "./returns-suite-response-history.dto";

export class ReturnsSuiteResponseDto {

    @ApiProperty()
    summary: ReturnsSuiteResponseSummaryDto[];

    @ApiProperty()
    history: ReturnsSuiteResponseHistoryDto[];

}