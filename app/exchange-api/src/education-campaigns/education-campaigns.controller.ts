import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor, Inject, forwardRef, Get, Query
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";


/*
* User created imports
* */
import {
  CreateEducationCampaignDto
} from "./dto/create-education-campaign.dto";
import { EducationCampaignsService } from "./education-campaigns.service";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";
import { UsersModule } from "../users/users.module";
import { GetEducationCampaignsDto } from "./dto/get-education-campaigns.dto";

@ApiTags("education-campaigns")
@Controller("education-campaigns")
export class EducationCampaignsController {

  /*
  * Add any services needed in the class
  * */
  constructor(
    /*
    * Education Campaign service injection
    * */
    private educationCampaignsService: EducationCampaignsService,
    /*
    * Injecting NestJS Config Service
    *
    * */
    private readonly configService: ConfigService
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
  @ApiResponse({
    description: "Refer to the EdcudationCampaign Schema"
  })
  @Post()
  async create(
    @Body() createEducationCampaignDto: CreateEducationCampaignDto) {

    /*
    * Check if the the vendors and buyers exit in the database
    * */
    return await this.educationCampaignsService.create(createEducationCampaignDto);
  }

  @Get()
  public async getAll(@Query() getEducationCampaigns: GetEducationCampaignsDto) {
    return await this.educationCampaignsService.getAll(getEducationCampaigns);
  }
}
