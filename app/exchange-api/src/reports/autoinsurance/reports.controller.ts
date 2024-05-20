import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Query,
    UseGuards,
    UseFilters,
  } from "@nestjs/common";
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { ReportsService } from './reports.service';
  import { ConfigService } from '@nestjs/config';
import { KPISummaryDto } from "./dto/kpi-summary.dto";
import { CommissionsReportResponseDto, GetCommissionsReportDto, GetInboundReportDto, GetInboundSubReportDto, GetOutboundReportDto, GetRequestsByReasonReportDto, GetReturnsSuiteReportDto, GetRevenueMatrixReportDto, ReturnsSuiteResponseDto, RevenueMatrixResponseDto } from "./dto";
import { CheckPermissions } from "../../decorators/check-permission.decorator";
import { ENTITIES, PERMISSION_ACTION } from "../../config/constants";
import { PermissionsGuard } from "../../guards/permission.guard";
import { AuthGuard } from "@nestjs/passport";
import { AuthExceptionFilter } from "../../filters/auth-exception.filter";

  
  @Controller('autoinsurance-reports')
  @ApiTags('autoinsurance-reports')
  export class ReportsController {
    constructor(private readonly reportsService: ReportsService,
                private readonly  configService: ConfigService) {}
  
      @ApiResponse({
        status: 401,
        description: 'Your are not Authorized to perform this action.',
      })
      @ApiResponse({
        status: 500,
        description: 'An internal server error has occured.',
      })
      @ApiOperation({
        summary: `This api is used to fetch the KPI summary for the dashboard`,
      })
      @ApiResponse({
        description: 'Refer to the Rule schema for the response details',
        type: Array<KPISummaryDto>
      })
      @Get('/dashboard/kpi-summary')
      @UseGuards(AuthGuard('jwt'), PermissionsGuard)
      @UseFilters(AuthExceptionFilter)
      @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_REPORTS, ENTITIES.Report])
      public async kpiSummary(@Res() response, @Query('user_id') user_id: string) {
        try {
          const kpiSummary = await this.reportsService.fetchKPISummaryForUser(user_id);
          return response.set({ 'api-version': this.configService.get<string>('API_VERSION') })
                  .status(HttpStatus.OK).json(kpiSummary);
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
        summary: `This api is used to fetch the Returns Suite report`,
      })
      @ApiResponse({
        description: 'Refer to the Rule schema for the response details',
        type: Array<ReturnsSuiteResponseDto>
      })
      @Get('/returns-suite')
      @UseGuards(AuthGuard('jwt'), PermissionsGuard)
      @UseFilters(AuthExceptionFilter)
      @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_REPORTS, ENTITIES.Report])
      public async returnsSuite(@Res() response, @Query() request: GetReturnsSuiteReportDto) {
        try {
          const returnsSuite = await this.reportsService.fetchReturnsSuiteReport(request);
          return response.set({ 'api-version': this.configService.get<string>('API_VERSION') })
                  .status(HttpStatus.OK).json(returnsSuite);
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
        summary: `This api is used to fetch the revenue matrix report`,
      })
      @ApiResponse({
        description: 'Returns instance of the RevenueMatrixResponseDto',
        type: RevenueMatrixResponseDto
      })
      @Get('/revenue-matrix')
      @UseGuards(AuthGuard('jwt'), PermissionsGuard)
      @UseFilters(AuthExceptionFilter)
      @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_REPORTS, ENTITIES.Report])
      public async revenueMatrix(@Res() response, @Query() query: GetRevenueMatrixReportDto) {
        try {
          const revenueMatrix = await this.reportsService.fetchRevenueMatrixReport(query);
          return response.set({ 'api-version': this.configService.get<string>('API_VERSION') })
                  .status(HttpStatus.OK).json(revenueMatrix);
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
        summary: `This api is used to fetch the Inbound Ping/Post analysis report`,
      })
      @ApiResponse({
        description: 'Refer to the Rule schema for the response details',
        type: Array<GetInboundReportDto>
      })
      @Get('/inbound')
      @UseGuards(AuthGuard('jwt'), PermissionsGuard)
      @UseFilters(AuthExceptionFilter)
      @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_REPORTS, ENTITIES.Report])
      public async inbound(@Res() response, @Query() body: GetInboundReportDto) {
        try {
          const inboundReport = await this.reportsService.fetchInboundReport(body);
          return response.set({ 'api-version': this.configService.get<string>('API_VERSION') })
                  .status(HttpStatus.OK).json(inboundReport);
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
        summary: `This api is used to fetch the Inbound Ping/Post sub analysis report`,
      })
      @Get('/inbound-sub-report')
      @UseGuards(AuthGuard('jwt'), PermissionsGuard)
      @UseFilters(AuthExceptionFilter)
      @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_REPORTS, ENTITIES.Report])
      public async inboundSubReport(@Res() response, @Query() request: GetInboundSubReportDto) {
        try {
          const inboundReport = await this.reportsService.fetchInboundSubReport(request);
          return response.set({ 'api-version': this.configService.get<string>('API_VERSION') })
                  .status(HttpStatus.OK).json(inboundReport);
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
        summary: `This api is used to fetch the Outbound Ping/Post analysis report`,
      })
      @Get('/outbound-ping-post')
      @UseGuards(AuthGuard('jwt'), PermissionsGuard)
      @UseFilters(AuthExceptionFilter)
      @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_REPORTS, ENTITIES.Report])
      public async fetchOutboundPingPostReport(@Res() response, @Query() request: GetOutboundReportDto) {
        try {
          const outboundReport = await this.reportsService.fetchOutboundPingPostReport(request);
          return response.set({ 'api-version': this.configService.get<string>('API_VERSION') })
                  .status(HttpStatus.OK).json(outboundReport);
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
        summary: `This api is used to fetch the Outbound Client Ping/Post analysis report`,
      })
      @Get('/outbound-client-ping-post')
      @UseGuards(AuthGuard('jwt'), PermissionsGuard)
      @UseFilters(AuthExceptionFilter)
      @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_REPORTS, ENTITIES.Report])
      public async fetchOutboundClientPingPostReport(@Res() response, @Query() request: GetOutboundReportDto) {
        try {
          const outboundReport = await this.reportsService.fetchOutboundClientPingPostReport(request);
          return response.set({ 'api-version': this.configService.get<string>('API_VERSION') })
                  .status(HttpStatus.OK).json(outboundReport);
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
        summary: `This api is used to fetch all the requests based on reason`,
      })
      @Get('/requests')
      @UseGuards(AuthGuard('jwt'), PermissionsGuard)
      @UseFilters(AuthExceptionFilter)
      @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_REPORTS, ENTITIES.Report])
      public async fetchRequestsByReason(@Res() response, @Query() request: GetRequestsByReasonReportDto) {
        try {
          const requests = await this.reportsService.fetchRequestsByReason(request);
          return response.set({ 'api-version': this.configService.get<string>('API_VERSION') })
                  .status(HttpStatus.OK).json(requests);
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
        summary: `This api is used to fetch the commissions report.`,
      })
      @ApiResponse({
        description: 'Refer to the Rule schema for the response details',
        type: Array<CommissionsReportResponseDto>
      })
      @Get('/commissions')
      @UseGuards(AuthGuard('jwt'), PermissionsGuard)
      @UseFilters(AuthExceptionFilter)
      @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_REPORTS, ENTITIES.Report])
      public async fetchCommissionsReport(@Res() response, @Query() request: GetCommissionsReportDto) {
        try {
          const outboundReport = await this.reportsService.fetchCommissionsReport(request);
          return response.set({ 'api-version': this.configService.get<string>('API_VERSION') })
                  .status(HttpStatus.OK).json(outboundReport);
        } catch (err) {
          return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message});
        }
      }
  
  }
  