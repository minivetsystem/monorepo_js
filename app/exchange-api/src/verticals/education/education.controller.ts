import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

/*
* User created modules
* */
import { EducationSearchService } from "./education-search.service";
import { CreateEducationSearchDto } from "./dto/create-education-search.dto";
import {
  CreateEducationResultsDto
} from "./dto/create-education-results.dto";
import { EducationResultsService } from "./education-results.service";
import { CreateLeadRequestsDto } from "./dto/create-lead-requests.dto";
import {
  EducationLeadRequestsService
} from "./education-lead-requests.service";

@ApiTags("education")
@Controller("education")
export class EducationController {

  constructor(
    /*
    * Inject Education Search Service
    * */
    private educationSearchService: EducationSearchService,
    /*
    * Inject the education results service
    * */
    private educationResultsService: EducationResultsService,
    /*
    * Inject Lead Requests Service
    * */
    private leadRequestsService: EducationLeadRequestsService
  ) {
  }

  @ApiResponse({
    status: 401,
    description: "Your are not Authorized to perform this action."
  })
  @ApiResponse({
    status: 400,
    description:
      "Bad request, check if all mandatory properties exist in the body"
  })
  @ApiResponse({
    status: 500,
    description: "An internal server error has occured."
  })
  @ApiOperation({
    summary: `This api endpoint is used to create a new Campaign.`
  })
  @Post("searches")
  async createSearch(@Body() createEducationSearchDto: CreateEducationSearchDto) {
    return this.educationSearchService.performSearch(createEducationSearchDto);
  }


  @ApiResponse({
    status: 401,
    description: "Your are not Authorized to perform this action."
  })
  @ApiResponse({
    status: 400,
    description:
      "Bad request, check if all mandatory properties exist in the body"
  })
  @ApiResponse({
    status: 500,
    description: "An internal server error has occured."
  })
  @ApiOperation({
    summary: `This api endpoint is used generate new results based on a search_id.`
  })
  @Get("results")
  async createResult(@Query() query: CreateEducationResultsDto) {
    return await this.educationResultsService.getResults(query);
  }


  @ApiResponse({
    status: 401,
    description: "Your are not Authorized to perform this action."
  })
  @ApiResponse({
    status: 400,
    description:
      "Bad request, check if all mandatory properties exist in the body"
  })
  @ApiResponse({
    status: 500,
    description: "An internal server error has occured."
  })
  @ApiOperation({
    summary: `This api endpoint is used to post final lead requests.`
  })
  @Post("lead_requests")
  async postLead(@Body() request: CreateLeadRequestsDto) {
    return await this.leadRequestsService.postLeadRequest(request);
  }
}


