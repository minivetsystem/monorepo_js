import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  HttpStatus, Param, UseInterceptors, UseGuards, UseFilters
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from "@nestjs/swagger";
import { LeadsService } from "./leads.service";
import {
  RESPONSE_TYPE,
  REQUEST_TYPE,
  REQUEST_STATES,
  RESPONSE_STATUSES,
  CLIENT_RESPONSE_TYPES,
  PERMISSION_ACTION,
  ENTITIES
} from "../../config/constants";
import {
  IncomingRequest
} from "./schemas";
import { ConfigService } from "@nestjs/config";
import { ClientReturnsFileDto } from "./dto/clientreturnsfile.dto";
import { reportError } from "../../helpers";
import { SettingsService } from "../../settings/settings.service";
import {
  PingDto,
  PostDto,
  RegenerateClientReturnsEmailDto,
  SendClientReturnsEmailDto
} from "./dto";
import {
  PingInterceptor
} from "../../interceptors/autoinsurance/PingInterceptor";
import { AuthGuard } from "@nestjs/passport";
import { PermissionsGuard } from "../../guards/permission.guard";
import { AuthExceptionFilter } from "../../filters/auth-exception.filter";
import { CheckPermissions } from "../../decorators/check-permission.decorator";

/**
 * This controller will store all the ping/post/bid requests.
 */
@Controller("leads")
@ApiTags("leads")
export class LeadsController {

  constructor(
    private readonly leadsService: LeadsService,
    private settingsService: SettingsService,
    private readonly configService: ConfigService) {
  }

  @ApiResponse({
    status: 201,
    description: "The record has been successfully created."
  })
  @ApiResponse({
    status: 401,
    description: "Your are not Authorized to perform this action."
  })
  @ApiResponse({
    status: 400,
    description: "Bad request, check if all mandatory properties exist in the body"
  })
  @ApiResponse({
    status: 500,
    description: "An internal server error has occured."
  })
  @ApiOperation({
    summary: `This api is used to process the returns file uploaded.`
  })
  @ApiBody({
    description: "Refer to the create post DTO for details of the body object"
  })
  @Post("/process-returns")
  @UseGuards(AuthGuard("jwt"), PermissionsGuard)
  @UseFilters(AuthExceptionFilter)
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_LEADS, ENTITIES.Lead])
  public async processReturns(@Res() response, @Body() body: ClientReturnsFileDto) {

    const validationErrors = await this.leadsService.validateReturnsFile(body);

    if (validationErrors.errors.length > 0) {
      return response.set({ "api-version": this.configService.get<string>("API_VERSION") })
        .status(HttpStatus.OK).send({
          reason: "Errors Detected",
          message: "The following errors were detected in this lead:",
          errors: validationErrors.errors
        });
    }

    const result = await this.leadsService.processReturns(body);

    return response.set({ "api-version": this.configService.get<string>("API_VERSION") })
      .status(HttpStatus.OK).send(result);
  }

  @ApiResponse({
    status: 201,
    description: "The record has been successfully created."
  })
  @ApiResponse({
    status: 401,
    description: "Your are not Authorized to perform this action."
  })
  @ApiResponse({
    status: 400,
    description: "Bad request, check if all mandatory properties exist in the body"
  })
  @ApiResponse({
    status: 500,
    description: "An internal server error has occured."
  })
  @ApiOperation({
    summary: `This api is used to sned the file client returns email to the vendor.`
  })
  @ApiBody({
    description: "Refer to the create post DTO for details of the body object"
  })
  @Post("/send-client-returns-email")
  @UseGuards(AuthGuard("jwt"), PermissionsGuard)
  @UseFilters(AuthExceptionFilter)
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_LEADS, ENTITIES.Lead])
  public async sendClientReturnsEmail(@Res() response, @Body() body: SendClientReturnsEmailDto) {

    const result = await this.leadsService.sendClientReturnsEmail(body);

    return response.set({ "api-version": this.configService.get<string>("API_VERSION") })
      .status(HttpStatus.OK).send(result);
  }

  @ApiResponse({
    status: 201,
    description: "The record has been successfully created."
  })
  @ApiResponse({
    status: 401,
    description: "Your are not Authorized to perform this action."
  })
  @ApiResponse({
    status: 400,
    description: "Bad request, check if all mandatory properties exist in the body"
  })
  @ApiResponse({
    status: 500,
    description: "An internal server error has occured."
  })
  @ApiOperation({
    summary: `This api is used to regenerate & sned the file client returns email to the vendor.`
  })
  @ApiBody({
    description: "Refer to the create post DTO for details of the body object"
  })
  @Post("/regenerate-client-returns-email")
  @UseGuards(AuthGuard("jwt"), PermissionsGuard)
  @UseFilters(AuthExceptionFilter)
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_LEADS, ENTITIES.Lead])
  public async regenerateClientReturnsEmail(@Res() response, @Body() body: RegenerateClientReturnsEmailDto) {

    const result = await this.leadsService.regenerateClientReturnsEmail(body);

    return response.set({ "api-version": this.configService.get<string>("API_VERSION") })
      .status(HttpStatus.OK).send(result);
  }

  /**
   * This is the POST api which will be shared with the Vendors.
   * @param response response for the api.
   * @param body post request body.
   * @param headers contains wait time.
   * @returns Post Response
   */
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created."
  })
  @ApiResponse({
    status: 401,
    description: "Your are not Authorized to perform this action."
  })
  @ApiResponse({
    status: 400,
    description: "Bad request, check if all mandatory properties exist in the body"
  })
  @ApiResponse({
    status: 500,
    description: "An internal server error has occured."
  })
  @ApiOperation({
    summary: `This is the POST api which will be shared with the Vendors.`
  })
  @ApiBody({
    description: "Refer to the create post DTO for details of the body object"
  })
  @UseInterceptors(PingInterceptor)
  @Post("/post")
  public async post(@Res() response, @Body() body: PostDto) {

    try {
      let confirmation_code = await this.leadsService.generateConfirmationCode((Date.now()).toString());

      if (!Number.isInteger(body.lead_mode)) {
        const pingResponse = {
          response: RESPONSE_TYPE.Rejected,
          confirmation: confirmation_code,
          price: 0.0,
          reason: "Validation error",
          message: "lead_mode should be an integer value."
        };
        return response.set({ "api-version": this.configService.get<string>("API_VERSION") })
          .status(HttpStatus.OK).send(pingResponse);
      }

      //Validate the ping request internally
      const validationPingErrors = await this.leadsService.validate(body, REQUEST_TYPE.Post);

      if (validationPingErrors.errors.length > 0) {
        const request = await this.leadsService.savePostRequest(body);
        const postResponse = {
          response: RESPONSE_TYPE.Rejected,
          confirmation: confirmation_code,
          price: 0.0,
          reason: "Errors Detected",
          message: "The following errors were detected in this lead:",
          errors: validationPingErrors.errors
        };
        await this.leadsService.savePostResponse(request._id, postResponse, RESPONSE_STATUSES.INVALID_POST_VALIDATION_ERRORS);
        await this.leadsService.setRequestState(request._id, REQUEST_STATES.Rejected, confirmation_code);
        await this.leadsService.savePost(request, CLIENT_RESPONSE_TYPES.POST_REJECTED);
        return response.set({ "api-version": this.configService.get<string>("API_VERSION") })
          .status(HttpStatus.OK).send(postResponse);
      }

      //Store the post request in db.
      const request = await this.leadsService.savePostRequest(body);

      confirmation_code = await this.leadsService.generateConfirmationCode(request._id.toString());

      const result = await this.leadsService.postSelectedClient(body, request._id, confirmation_code);

      if (result.response === REQUEST_STATES.Accepted) {
        await this.leadsService.setRequestState(request._id, REQUEST_STATES.Accepted, confirmation_code);
        await this.leadsService.savePost(request, CLIENT_RESPONSE_TYPES.POST_SUCCESSFUL, result.lead_id);
      } else {
        await this.leadsService.setRequestState(request._id, REQUEST_STATES.Rejected, confirmation_code);
        await this.leadsService.savePost(request, CLIENT_RESPONSE_TYPES.POST_REJECTED, result.lead_id);
      }

      if (result.response === REQUEST_STATES.Accepted && body.lead_mode === 0) {
        const postResponse = {
          response: RESPONSE_TYPE.Accepted,
          confirmation: confirmation_code,
          price: 2.0
        };
        await this.leadsService.savePostResponse(request._id, postResponse, RESPONSE_STATUSES.VALID_TEST_POST_ACCEPTED);
        return response.set({ "api-version": this.configService.get<string>("API_VERSION") })
          .status(HttpStatus.OK).send(postResponse);
      }

      return response.set({ "api-version": this.configService.get<string>("API_VERSION") })
        .status(HttpStatus.OK).send({
          response: result.response,
          confirmation: result.confirmation,
          price: result.price
        });

    } catch (err) {
      console.log(err);
      reportError(err, body,
        REQUEST_TYPE.Post,
        this.settingsService.adminBCCEmailIds,
        this.configService.get<string>("SEND_GRID_EMAIL_SERVER"),
        this.configService.get<string>("SEND_GRID_EMAIL_PORT"),
        this.configService.get<string>("SEND_GRID_EMAIL_USERNAME"),
        this.configService.get<string>("SEND_GRID_EMAIL_PASSWORD"));
      const confirmation_code = await this.leadsService.generateConfirmationCode((Date.now()).toString());
      const postResponse = {
        response: RESPONSE_TYPE.Rejected,
        confirmation: confirmation_code,
        price: 0.0,
        reason: "Errors Detected",
        message: "Could not process your request at this time. Please report this incident to our technical team."
      };
      return response.set({ "api-version": this.configService.get<string>("version") })
        .status(HttpStatus.OK).send(postResponse);
    }
  }

  /**
   * This api is used to receive the ping request.
   * @param response Ping request response.
   * @param body Ping request body
   * @param headers headers contain wait time.
   */
  @ApiResponse({
    status: 201,
    description: "The record has been successfully created."
  })
  @ApiResponse({
    status: 401,
    description: "Your are not Authorized to perform this action."
  })
  @ApiResponse({
    status: 400,
    description: "Bad request, check if all mandatory properties exist in the body"
  })
  @ApiResponse({
    status: 500,
    description: "An internal server error has occured."
  })
  @ApiOperation({
    summary: `This is the PING api which will be shared with the Vendors.`
  })
  @ApiBody({
    description: "Refer to the create post DTO for details of the body object"
  })
  @UseInterceptors(PingInterceptor)
  @Post("/ping")
  public async ping(@Res() response, @Body() body: PingDto) {
    try {
      let confirmation_code = await this.leadsService.generateConfirmationCode((Date.now()).toString());

      if (body.lead_mode === 0 && body.zip.toString().substr(-1) === "0") {
        const pingResponse = {
          response: RESPONSE_TYPE.Rejected,
          confirmation: confirmation_code,
          price: 0.0,
          reason: "No Buyers Found",
          message: "There were no buyers available to bid on this lead."
        };
        const request = await this.leadsService.savePingRequest(body);
        await this.leadsService.savePingResponse(request._id, pingResponse, RESPONSE_STATUSES.TEST_PING_REJECTED);
        await this.leadsService.savePing(request, CLIENT_RESPONSE_TYPES.INTERNAL_NO_BUYER_FOUND);
        return response.set({ "api-version": this.configService.get<string>("API_VERSION") })
          .status(HttpStatus.OK).send(pingResponse);
      } else if (body.lead_mode === 0 && body.zip.toString().substr(-1) !== "0" && parseInt(body.zip.toString().substr(-1)) % 2 !== 0) {
        const pingResponse = {
          response: RESPONSE_TYPE.Rejected,
          confirmation: confirmation_code,
          price: 0.0
        };
        const request = await this.leadsService.savePingRequest(body);
        await this.leadsService.savePingResponse(request._id, pingResponse, RESPONSE_STATUSES.TEST_PING_REJECTED);
        await this.leadsService.savePing(request, CLIENT_RESPONSE_TYPES.INTERNAL_NO_BUYER_FOUND);
        return response.set({ "api-version": this.configService.get<string>("API_VERSION") })
          .status(HttpStatus.OK).send(pingResponse);
      }

      const validationErrors = await this.leadsService.validate(body, REQUEST_TYPE.Ping);

      if (validationErrors.errors.length > 0) {
        const pingResponse = {
          response: RESPONSE_TYPE.Rejected,
          confirmation: confirmation_code,
          price: 0.0,
          reason: "Errors Detected",
          message: "The following errors were detected in this lead:",
          errors: validationErrors.errors
        };
        const pingrequest = await this.leadsService.savePingRequest(body);
        await this.leadsService.savePingResponse(pingrequest._id, pingResponse, RESPONSE_STATUSES.INVALID_PING_VALIDATION_ERRORS);
        await this.leadsService.savePing(pingrequest, CLIENT_RESPONSE_TYPES.INTERNAL_NO_BUYER_FOUND);
        return response.set({ "api-version": this.configService.get<string>("version") })
          .status(HttpStatus.OK).send(pingResponse);
      }

      const request = await this.leadsService.savePingRequest(body);

      const validation = await this.leadsService.pingAllClients(body, request._id, request.lead_type._id);

      if (validation.errors.length > 0) {
        const pingResponse = {
          response: RESPONSE_TYPE.Rejected,
          confirmation: confirmation_code,
          price: 0.0,
          reason: "Errors Detected",
          message: "The following errors were detected in this lead:",
          errors: validation.errors
        };
        await this.leadsService.savePingResponse(request._id, pingResponse, RESPONSE_STATUSES.INVALID_PING_VALIDATION_ERRORS);
        return response.set({ "api-version": this.configService.get<string>("version") })
          .status(HttpStatus.OK).send(pingResponse);
      }

      confirmation_code = await this.leadsService.generateConfirmationCode(request._id.toString());

      const bidResult = await this.processBidsForPingRequest(request, confirmation_code);

      if (request.lead_mode === 0 && request.zip.toString().substr(-1) !== "0" && parseInt(request.zip.toString().substr(-1)) % 2 === 0) {
        await this.leadsService.setRequestState(request._id, REQUEST_STATES.Bidded, confirmation_code);
        const pingResponse = {
          confirmation: confirmation_code,
          response: RESPONSE_TYPE.Accepted,
          price: bidResult.price
        };
        await this.leadsService.savePingResponse(request._id, pingResponse, RESPONSE_STATUSES.VALID_TEST_PING_ACCEPTED);
        return response.set({ "api-version": this.configService.get<string>("version") })
          .status(HttpStatus.OK).send(pingResponse);
      }

      return response.set({ "api-version": this.configService.get<string>("API_VERSION") })
        .status(HttpStatus.OK).send(bidResult);

    } catch (err) {
      console.log(err);
      reportError(err, body,
        REQUEST_TYPE.Ping,
        this.settingsService.adminBCCEmailIds,
        this.configService.get<string>("SEND_GRID_EMAIL_SERVER"),
        this.configService.get<string>("SEND_GRID_EMAIL_PORT"),
        this.configService.get<string>("SEND_GRID_EMAIL_USERNAME"),
        this.configService.get<string>("SEND_GRID_EMAIL_PASSWORD"));
      const confirmation_code = await this.leadsService.generateConfirmationCode((Date.now()).toString());
      return response.set({ "api-version": this.configService.get<string>("version") })
        .status(HttpStatus.OK).send({
          response: RESPONSE_TYPE.Rejected,
          confirmation: confirmation_code,
          price: 0.0,
          reason: "Errors Detected",
          message: "Could not process your request at this time. Please report this incident to our technical team."
        });
    }
  }

  private async processBidsForPingRequest(request: IncomingRequest, confirmation_code: string): Promise<any> {

    const highestBid = await this.leadsService.fetchHighestBid(request._id);

    if (highestBid) {
      await this.leadsService.setConfirmationCodeInBid(highestBid._id, confirmation_code);

      if (highestBid.vendor_price < 0 || highestBid.revenue_share < 0) {
        await this.leadsService.setRequestState(request._id, REQUEST_STATES.Rejected, confirmation_code);
        const pingResponse = {
          response: RESPONSE_TYPE.Rejected,
          confirmation: confirmation_code,
          price: 0.0,
          reason: CLIENT_RESPONSE_TYPES.INTERNAL_NO_BUYER_FOUND,
          message: "Bids do not meet minimum_price requirement."
        };
        await this.leadsService.savePing(request, CLIENT_RESPONSE_TYPES.INTERNAL_NO_BUYER_FOUND);
        await this.leadsService.savePingResponse(request._id, pingResponse, RESPONSE_STATUSES.PING_REJECTED_NOT_BUYERS_FOUND);
        return pingResponse;
      } else {
        await this.leadsService.setRequestState(request._id, REQUEST_STATES.Bidded, confirmation_code);
        const pingResponse = {
          response: RESPONSE_TYPE.Accepted,
          confirmation: confirmation_code,
          price: Number(highestBid.vendor_price.toFixed(2))
        };
        await this.leadsService.savePingResponse(request._id, pingResponse, RESPONSE_STATUSES.VALID_PING_HIGHEST_BID_SENT);
        await this.leadsService.savePing(request, CLIENT_RESPONSE_TYPES.PING_SUCCESSFUL, highestBid.client, highestBid.client.campaign);
        return pingResponse;
      }
    }

    await this.leadsService.setRequestState(request._id, REQUEST_STATES.Expired, confirmation_code);
    const pingResponse = {
      response: RESPONSE_TYPE.Rejected,
      confirmation: confirmation_code,
      price: 0.0,
      reason: CLIENT_RESPONSE_TYPES.INTERNAL_NO_BUYER_FOUND,
      message: "There were no buyers available to bid on this lead."
    };
    await this.leadsService.savePing(request, CLIENT_RESPONSE_TYPES.INTERNAL_NO_BUYER_FOUND);
    await this.leadsService.savePingResponse(request._id, pingResponse, RESPONSE_STATUSES.PING_REJECTED_NOT_BUYERS_FOUND);
    return pingResponse;
  }

  /**
   * This api is used to fetch all the ping requests which are new for the
   * client dashboard.
   * @param response
   */
  @ApiResponse({
    status: 401,
    description: "Your are not Authorized to perform this action."
  })
  @ApiResponse({
    status: 500,
    description: "An internal server error has occured."
  })
  @ApiOperation({
    summary: `This api is used to fetch all the new pings.`
  })
  @ApiResponse({
    description: "Refer to the Request schema for the response details",
    type: Array<IncomingRequest>
  })
  @Get("/testing-tool/pings")
  public async pings(@Res() response) {
    const allPings = await this.leadsService.fetchNewPings();

    return response.set({ "api-version": this.configService.get<string>("API_VERSION") })
      .status(HttpStatus.OK).json(allPings);
  }

  /**
   * This api is used to fetch all the bids for the ping request using ping_id
   * @param response
   * @param param ping_id
   */
  @ApiResponse({
    status: 401,
    description: "Your are not Authorized to perform this action."
  })
  @ApiResponse({
    status: 500,
    description: "An internal server error has occured."
  })
  @ApiOperation({
    summary: `This api is used to fetch all the bids for the ping request.`
  })
  @ApiResponse({
    description: "Refer to the Bid schema for the response details"
  })
  @Get("/pings/:ping_id/bids")
  public async bids(@Res() response, @Param() param: { ping_id: string }) {
    const allBids = await this.leadsService.fetchAllBidsForRequest(param.ping_id);

    return response.set({ "api-version": this.configService.get<string>("API_VERSION") })
      .status(HttpStatus.OK).json(allBids);
  }

  /**
   * This api is used to fetch all the new post requests for the client
   * dashboard.
   * @param response
   */
  @ApiResponse({
    status: 401,
    description: "Your are not Authorized to perform this action."
  })
  @ApiResponse({
    status: 500,
    description: "An internal server error has occured."
  })
  @ApiOperation({
    summary: `This api is used to fetch all the new posts.`
  })
  @ApiResponse({
    description: "Refer to the Request schema for the response details",
    type: Array<IncomingRequest>
  })
  @Get("/posts")
  public async posts(@Res() response) {
    const allPosts = await this.leadsService.fetchNewPosts();

    return response.set({ "api-version": this.configService.get<string>("API_VERSION") })
      .status(HttpStatus.OK).json(allPosts);
  }

}
