import { Controller, Get, Query } from "@nestjs/common";
import { AllSearchQueryDto } from "./dto/all-search-query.dto";
import {
  EducationSearchReportsService
} from "./providers/education-search-reports.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AllResultsQueryDto } from "./dto/all-results-query.dto";
import {
  EducationResultsReportsService
} from "./providers/education-results-reports.service";

@ApiTags("Education Reports")
@Controller("education-reports")
export class EducationReportsController {

  /*
  * Constructor for dependecy Injection
  * */
  constructor(
    /*
    * Injecting EducationSearchReportsService
    * */
    private readonly educationSearchReportsService: EducationSearchReportsService,
    /*
    * Injecting EducationResultsReportsService
    * */
    private readonly educationResultsReportsService: EducationResultsReportsService
  ) {
  }

  @Get("search-reports")
  @ApiOperation({
    description: "Get All Search requests sent to Education Endpoint"
  })
  public async getAllSearch(@Query() allSearchQueryDto: AllSearchQueryDto) {
    return await this.educationSearchReportsService.findAllReports(allSearchQueryDto);
  }

  @Get("result-reports")
  @ApiOperation({
    description: "Get All results requests sent to Education Endpoint"
  })
  public async getAllResults(@Query() allResultsQuery: AllResultsQueryDto) {
    return await this.educationResultsReportsService.findAll(allResultsQuery);
  }

  public async getAllEduPosts(){}
}
