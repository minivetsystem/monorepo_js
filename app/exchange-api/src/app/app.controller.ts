import {
  Controller,
  Get,
  Res,
  HttpStatus,
  UseGuards,
  UseFilters,
  Query
} from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { AppService } from './app.service';
import { AuthGuard } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Role } from "../auth/schemas";
import { PermissionsGuard } from "../guards/permission.guard";
import { AuthExceptionFilter } from "../filters/auth-exception.filter";
import { CheckPermissions } from "../decorators/check-permission.decorator";
import { PERMISSION_ACTION, ENTITIES } from "../config/constants";

/**
 * This controller will store all the general apis.
 */
@Controller('app')
@ApiTags('app')
export class AppController {
  constructor(private readonly appService: AppService,private readonly configService: ConfigService) {}

  @ApiResponse({
    status: 401,
    description: 'Your are not Authorized to perform this action.',
  })
  @ApiResponse({
    status: 500,
    description: 'An internal server error has occured.',
  })
  @ApiOperation({
    summary: `This api is used to fetch all the roles`,
  })
  @ApiResponse({
    description: 'Refer to the Role schema for the response details',
    type: Array<Role>
  })
  @UseGuards(AuthGuard())
  @Get('/roles')
  public async roles(@Res() response) {
    const allRoles = await this.appService.fetchAllRoles();
    return response.set({ 'api-version': this.configService.get<string>('API_VERSION') })
      .status(HttpStatus.OK).json(allRoles);
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
    summary: `This api is used to fetch all the settings for specific entity.`,
  })
  @ApiResponse({
    description: 'Refer to the User schema'
  })
  @Get('/role-settings')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @UseFilters(AuthExceptionFilter)
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_ADMIN, ENTITIES.User])
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_CLIENT, ENTITIES.User])
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_VENDOR, ENTITIES.User])
  public async fetchRoleSettings(@Res() response, @Query('role') role: string) {
    try {
      const settings = await this.appService.fetchRoleSettings(role);
      return response.status(HttpStatus.OK).send(settings);
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
    summary: `This api is used to fetch all the settings for specific entity.`,
  })
  @ApiResponse({
    description: 'Refer to the User schema'
  })
  @Get('/profile-tabs')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @UseFilters(AuthExceptionFilter)
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_ADMIN, ENTITIES.User])
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_CLIENT, ENTITIES.User])
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_VENDOR, ENTITIES.User])
  public async fetchProfileTabsForRole(@Res() response, @Query('role') role: string) {
    try {
      const tabs = await this.appService.fetchProfileTabsForRole(role);
      return response.status(HttpStatus.OK).send(tabs);
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
    summary: `This api is used to fetch all the settings for specific entity.`,
  })
  @ApiResponse({
    description: 'Refer to the Lead Type schema'
  })
  @Get('/lead-types')
  //@UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @UseFilters(AuthExceptionFilter)
  public async fetchLeadTypes(@Res() response) {
    try {
      const leadTypes = await this.appService.fetchAllLeadTypes();
      return response.status(HttpStatus.OK).send(leadTypes);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message});
    }
  }

}
