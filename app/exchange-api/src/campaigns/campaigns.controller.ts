import {
    Controller,
    Post,
    Get,
    Body,
    Res,
    HttpStatus,
    UseGuards,
    UseFilters,
    Param,
    Patch,
    Delete
  } from "@nestjs/common";
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { CampaignsService } from './campaigns.service';
  import { PostingSpecDto } from './dto';
  import { ConfigService } from '@nestjs/config';
  import { PermissionsGuard } from "../guards/permission.guard";
  import { AuthExceptionFilter } from "../filters/auth-exception.filter";
  import { CheckPermissions } from "../decorators/check-permission.decorator";
  import { PERMISSION_ACTION, ENTITIES } from "../config/constants";
  import { AuthGuard } from "@nestjs/passport";
  
  @Controller('campaigns')
  @ApiTags('campaigns')
  export class CampaignsController {
    constructor(private readonly campaignsService: CampaignsService,
                private readonly  configService: ConfigService) {}
  
    @ApiResponse({
      status: 401,
      description: 'Your are not Authorized to perform this action.',
    })
    @ApiResponse({
      status: 400,
      description:
        'Bad request, check if all mandatory properties exist in the body',
    })
    @ApiResponse({
      status: 500,
      description: 'An internal server error has occured.',
    })
    @ApiOperation({
      summary: `This api is used to fetch all the users including clients & vendors`,
    })
    @ApiResponse({
      description: 'Refer to the User schema'
    })
    @Post('/fetch-campaigns')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @UseFilters(AuthExceptionFilter)
    @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_CAMPAIGN, ENTITIES.Campaign])
    public async fetchCampaigns(@Res() response, @Body() body) {
      try {
        const camapigns = await this.campaignsService.fetchAllCampaigns(body);
        return response.status(HttpStatus.OK).send(camapigns);
      } catch (err) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message});
      }
    }

      @ApiResponse({
        status: 401,
        description: 'Your are not Authorized to perform this action.',
      })
      @ApiResponse({
        status: 400,
        description:
          'Bad request, check if all mandatory properties exist in the body',
      })
      @ApiResponse({
        status: 500,
        description: 'An internal server error has occured.',
      })
      @ApiOperation({
        summary: `This api is used to fetch all the campaigns`,
      })
      @ApiResponse({
        description: 'Refer to the Campaign schema'
      })
      @Get('/:campaign_id')
      @UseGuards(AuthGuard('jwt'), PermissionsGuard)
      @UseFilters(AuthExceptionFilter)
      @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_CAMPAIGN, ENTITIES.Campaign])
      public async fetchCampaignById(@Res() response, @Param('campaign_id') campaign_id: string) {
        try {
          const campaign = await this.campaignsService.fetchCampaignById(campaign_id);
          return response.status(HttpStatus.OK).send(campaign);
        } catch (err) {
          console.log(err);
          return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message});
        }
      }
  
      @ApiResponse({
        status: 401,
        description: 'Your are not Authorized to perform this action.',
      })
      @ApiResponse({
        status: 400,
        description:
          'Bad request, check if all mandatory properties exist in the body',
      })
      @ApiResponse({
        status: 500,
        description: 'An internal server error has occured.',
      })
      @ApiOperation({
        summary: `This api is used to create a new campaign.`,
      })
      @ApiResponse({
        description: 'Refer to the Campaign schema'
      })
      @Post('/')
      @UseGuards(AuthGuard('jwt'), PermissionsGuard)
      @UseFilters(AuthExceptionFilter)
      @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_CAMPAIGN, ENTITIES.Campaign])
      public async createCampaign(@Res() response, @Body() body) {
        try {
          const users = await this.campaignsService.createCampaign(body);
          return response.status(HttpStatus.OK).send(users);
        } catch (err) {
          return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message});
        }
      }
  
      @ApiResponse({
        status: 401,
        description: 'Your are not Authorized to perform this action.',
      })
      @ApiResponse({
        status: 400,
        description:
          'Bad request, check if all mandatory properties exist in the body',
      })
      @ApiResponse({
        status: 500,
        description: 'An internal server error has occured.',
      })
      @ApiOperation({
        summary: `This api is used to update an existing campaign.`,
      })
      @ApiResponse({
        description: 'Refer to the Campaign schema'
      })
      @Patch('/:campaign_id')
      @UseGuards(AuthGuard('jwt'), PermissionsGuard)
      @UseFilters(AuthExceptionFilter)
      @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_CAMPAIGN, ENTITIES.Campaign])
      public async updateCampaign(@Res() response, @Body() body, @Param('campaign_id') campaign_id: string) {
        try {
          const users = await this.campaignsService.updateCampaign(body, campaign_id);
          return response.status(HttpStatus.OK).send(users);
        } catch (err) {
          return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message});
        }
      }
  
      @ApiResponse({
        status: 401,
        description: 'Your are not Authorized to perform this action.',
      })
      @ApiResponse({
        status: 400,
        description:
          'Bad request, check if all mandatory properties exist in the body',
      })
      @ApiResponse({
        status: 500,
        description: 'An internal server error has occured.',
      })
      @ApiOperation({
        summary: `This api is used to delete an existing user.`,
      })
      @ApiResponse({
        description: 'Refer to the User schema'
      })
      @Delete('/:campaign_id')
      @UseGuards(AuthGuard('jwt'), PermissionsGuard)
      @UseFilters(AuthExceptionFilter)
      @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_CAMPAIGN, ENTITIES.Campaign])
      public async deleteUser(@Res() response, @Param('campaign_id') campaign_id: string) {
        try {
          const users = await this.campaignsService.deleteCampaign(campaign_id);
          return response.status(HttpStatus.OK).send(users);
        } catch (err) {
          return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message});
        }
      }

      @ApiResponse({
        status: 401,
        description: 'Your are not Authorized to perform this action.',
      })
      @ApiResponse({
        status: 500,
        description: 'An internal server error has occured.',
      })
      @ApiOperation({
        summary: `This api is used to fetch the posting specs.`,
      })
      @ApiResponse({
        description: 'Refer to the Rule schema for the response details',
        type: Array<PostingSpecDto>
      })
      @Get('/lead/specs')
      public async specs(@Res() response) {
        const postingSpecs = await this.campaignsService.fetchPostingSpecs();
        return response.set({ 'api-version': this.configService.get<string>('API_VERSION') })
                .status(HttpStatus.OK).json(postingSpecs);
      }
  
  }
  