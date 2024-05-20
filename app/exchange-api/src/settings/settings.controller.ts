import {
    Controller,
    Get,
    Res,
    HttpStatus,
    UseGuards,
    UseFilters,
  } from "@nestjs/common";
  import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { SettingsService } from './settings.service';
  import { ConfigService } from '@nestjs/config';
  import { PermissionsGuard } from "../guards/permission.guard";
  import { AuthExceptionFilter } from "../filters/auth-exception.filter";
  import { CheckPermissions } from "../decorators/check-permission.decorator";
  import { PERMISSION_ACTION, ENTITIES } from "../config/constants";
  import { AuthGuard } from "@nestjs/passport";
  
  @Controller('settings')
  @ApiTags('settings')
  export class SettingsController {
    constructor(private readonly settingsService: SettingsService,
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
      summary: `This api is used to fetch all the settings`,
    })
    @ApiResponse({
      description: 'Refer to the User schema'
    })
    @Get('/')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @UseFilters(AuthExceptionFilter)
    @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_ADMIN, ENTITIES.User])
    @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_CLIENT, ENTITIES.User])
    @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_VENDOR, ENTITIES.User])
    public async fetchSettings(@Res() response) {
      try {
        const settings = await this.settingsService.fetchSettings();
        return response.status(HttpStatus.OK).send(settings);
      } catch (err) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message});
      }
    }

}