import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  HttpStatus,
  Headers,
  Query
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SearchesService } from './searches.service';
import { SearchRequestDto, SearchResultRequestDto, PostRequestDto } from "./dto";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "../auth/auth.service";
import { X_API_KEY, X_SECRET } from "../config/constants";

/**
 * This controller will be used to store the searches api.
 */
@Controller('searches')
@ApiTags('searches')
export class SearchesController {
  constructor(private readonly authService: AuthService,
              private readonly searchesService: SearchesService,
              private readonly  configService: ConfigService) {}

  /**
   * This api is used to process the search from vendors.
   * @param response search response.
   * @param body instance of the search request dto
   * @returns status.
   */
  @ApiResponse({
    status: 401,
    description: 'Your are not Authorized to perform this action.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, check if all mandatory properties exist in the body',
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error has occured.',
  })
  @ApiOperation({
    summary: `This api is is used to process the search for the vendors.`,
  })
  @Post('/')
  public async searches(@Res() response, @Body() body: SearchRequestDto, @Headers() headers) {
    try {
      if(!headers[X_API_KEY] || !headers[X_SECRET]) {
        return response.status(HttpStatus.BAD_REQUEST).send(`No x-api-key and x-secret found.`);
      }
  
      const isAuthenticated = await this.authService.validateApiKey(body.partner_code, headers[X_API_KEY], headers[X_SECRET]);
  
      if(isAuthenticated) {
        const validationResult = await this.searchesService.validate(body);
  
        if(validationResult.errors.length > 0) {
          return response.status(HttpStatus.BAD_REQUEST).send(validationResult);
        }

        const leadHoopResponse = await this.searchesService.searchOnLeadHoop(body);
    
        return response.status(HttpStatus.OK).send(leadHoopResponse);
      } else {
        return response.status(HttpStatus.BAD_REQUEST).send({ error: `Authentication failed.`});
      }
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).send({ error: err });
    }
  }


  /**
   * This api is used to get the search result from search id.
   * @param response search response.
   * @param body instance of the search request dto
   * @returns status.
   */
  @ApiResponse({
    status: 401,
    description: 'Your are not Authorized to perform this action.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, check if all mandatory properties exist in the body',
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error has occured.',
  })
  @ApiOperation({
    summary: `This api is is used to get the searched offers for the vendors.`,
  })
  @Get('/results')
  public async getSearchResult(@Res() response, @Query('searchId') searchId: string, @Query('waitTime') waitTime: string, @Headers() headers) {
    try {
      if(!headers[X_API_KEY] || !headers[X_SECRET]) {
        return response.status(HttpStatus.BAD_REQUEST).send(`No x-api-key and x-secret found.`);
      }

      let isAuthenticated = false;
      const vendor = await this.authService.getVendorByAPIKey(headers[X_API_KEY]);

      if (vendor) {
        isAuthenticated = await this.authService.validateApiKey(vendor.partner_code, headers[X_API_KEY], headers[X_SECRET]);
      }

      if (!isAuthenticated) {
        return response.status(HttpStatus.BAD_REQUEST).send({ error: `Authentication failed.`});
      } else {
        const searchResultResponse = await this.searchesService.searchResultOnLeadHoop({searchId, waitTime});
  
        return response.status(HttpStatus.OK).send(searchResultResponse);
      }
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).send({ error: err });
    }
  }

   /**
   * This api is used to get the search result from search id.
   * @param response search response.
   * @param body instance of the search request dto
   * @returns status.
   */
   @ApiResponse({
    status: 401,
    description: 'Your are not Authorized to perform this action.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, check if all mandatory properties exist in the body',
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error has occured.',
  })
  @ApiOperation({
    summary: `This api is is used to post offer to leadhoop.`,
  })
  @Post('/lead_requests')
  public async postLeadRequest(@Res() response, @Body() body: any, @Headers() headers) {
    try {
      if(!headers[X_API_KEY] || !headers[X_SECRET]) {
        return response.status(HttpStatus.BAD_REQUEST).send(`No x-api-key and x-secret found.`);
      }

      let isAuthenticated = false;
      const vendor = await this.authService.getVendorByAPIKey(headers[X_API_KEY]);

      if (vendor) {
        isAuthenticated = await this.authService.validateApiKey(vendor.partner_code, headers[X_API_KEY], headers[X_SECRET]);
      }

      if (!isAuthenticated) {
        return response.status(HttpStatus.BAD_REQUEST).send({ error: `Authentication failed.`});
      } else {
        const requestBody: PostRequestDto = body;
        const validationResult = await this.searchesService.validatePostOffer(requestBody);
        
        if(validationResult.errors.length > 0) {
          return response.status(HttpStatus.BAD_REQUEST).send(validationResult);
        }
        
        const leadHoopResponse = await this.searchesService.postOfferOnLeadHoop(body, vendor._id);
    
        return response.status(HttpStatus.OK).send(leadHoopResponse);
      }
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).send({ error: err });
    }
  }


}
