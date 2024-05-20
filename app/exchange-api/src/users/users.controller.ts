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
  Delete,
  Query
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { PermissionsGuard } from "../guards/permission.guard";
import { AuthExceptionFilter } from "../filters/auth-exception.filter";
import { CheckPermissions } from "../decorators/check-permission.decorator";
import { PERMISSION_ACTION, ENTITIES } from "../config/constants";
import { AuthGuard } from "@nestjs/passport";
import { GetUsersByRoleDto } from "./dto";

/**
 * This controller will store all the user apis.
 */
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService,
              private readonly  configService: ConfigService) {}

  /**
   * Route - '/'
   * This api is used to fetch all the users both clients & vendors.
   */
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
  @Post('/fetch-users')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @UseFilters(AuthExceptionFilter)
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_ADMIN, ENTITIES.User])
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_CLIENT, ENTITIES.User])
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_VENDOR, ENTITIES.User])
  public async fetchUsers(@Res() response, @Body() body) {
    try {
      const users = await this.usersService.fetchAllUsers(body);
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
    summary: `This api is used to send welcome email to the vendor.`,
  })
  @ApiResponse({
    description: 'Refer to the User schema'
  })
  @Post('/send-vendor-welcome')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @UseFilters(AuthExceptionFilter)
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_ADMIN, ENTITIES.User])
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_CLIENT, ENTITIES.User])
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_VENDOR, ENTITIES.User])
  public async sendVendorWelcome(@Res() response, @Body() body) {
    try {
      const vendor = await this.usersService.sendVendorWelcome(body);
      return response.status(HttpStatus.OK).send(vendor);
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
    summary: `This api is used to send welcome email to the client.`,
  })
  @ApiResponse({
    description: 'Refer to the User schema'
  })
  @Post('/send-client-welcome')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @UseFilters(AuthExceptionFilter)
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_ADMIN, ENTITIES.User])
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_CLIENT, ENTITIES.User])
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_VENDOR, ENTITIES.User])
  public async sendClientWelcome(@Res() response, @Body() body) {
    try {
      const client = await this.usersService.sendClientWelcome(body);
      return response.status(HttpStatus.OK).send(client);
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
    summary: `This api is used to fetch all the users including clients & vendors`,
  })
  @ApiResponse({
    description: 'Refer to the User schema'
  })
  @Get('/fetch-users-by-role')
  @UseGuards(AuthGuard('jwt'), PermissionsGuard)
  @UseFilters(AuthExceptionFilter)
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_ADMIN, ENTITIES.User])
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_CLIENT, ENTITIES.User])
  @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_VENDOR, ENTITIES.User])
  public async fetchUsersByRole(@Res() response, @Query() request: GetUsersByRoleDto) {
    try {
      const users = await this.usersService.fetchUsersByRole(request);
      return response.status(HttpStatus.OK).send(users);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message});
    }
  }

    /**
   * Route - '/'
   * This api is used to fetch a user by id.
   */
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
    @Get('/:user_id')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @UseFilters(AuthExceptionFilter)
    @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_ADMIN, ENTITIES.User])
    @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_CLIENT, ENTITIES.User])
    @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_VENDOR, ENTITIES.User])
    public async fetchUserById(@Res() response, @Param('user_id') user_id: string) {
      try {
        const users = await this.usersService.fetchUserById(user_id);
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
      summary: `This api is used to create a new user.`,
    })
    @ApiResponse({
      description: 'Refer to the User schema'
    })
    @Post('/')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @UseFilters(AuthExceptionFilter)
    @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_ADMIN, ENTITIES.User])
    @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_CLIENT, ENTITIES.User])
    @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_VENDOR, ENTITIES.User])
    public async createUser(@Res() response, @Body() body) {
      try {
        const users = await this.usersService.createUser(body);
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
      summary: `This api is used to update an existing user.`,
    })
    @ApiResponse({
      description: 'Refer to the User schema'
    })
    @Patch('/:user_id')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @UseFilters(AuthExceptionFilter)
    @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_ADMIN, ENTITIES.User])
    @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_CLIENT, ENTITIES.User])
    @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_VENDOR, ENTITIES.User])
    public async updateUser(@Res() response, @Body() body, @Param('user_id') user_id: string) {
      try {
        const users = await this.usersService.updateUser(body, user_id);
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
    @Delete('/:user_id')
    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @UseFilters(AuthExceptionFilter)
    @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_ADMIN, ENTITIES.User])
    @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_CLIENT, ENTITIES.User])
    @CheckPermissions([PERMISSION_ACTION.CAN_MANAGE_VENDOR, ENTITIES.User])
    public async deleteUser(@Res() response, @Param('user_id') user_id: string) {
      try {
        const users = await this.usersService.deleteUser(user_id);
        return response.status(HttpStatus.OK).send(users);
      } catch (err) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message});
      }
    }

}
