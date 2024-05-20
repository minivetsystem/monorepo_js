import { Controller, Post, Patch, Get, UseGuards, Body, Res,Req, Param, HttpStatus, UseFilters, Delete } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from './users.service';
import { AuthGuard } from "@nestjs/passport";
import { PERMISSION_ACTION, ENTITIES } from "../config/constants";
import { AuthExceptionFilter } from "../filters/auth-exception.filter";
import { CheckPermissions } from "../decorators/check-permission.decorator";

@Controller("users")
@ApiTags("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService
  ) {}

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
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(AuthExceptionFilter)
  @CheckPermissions([PERMISSION_ACTION.View, ENTITIES.User])
  public async fetchUsers(@Res() response, @Body() body) {
    try {
      const users = await this.usersService.fetchAllUsers(body);
      return response.status(HttpStatus.OK).send(users);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message });
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
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(AuthExceptionFilter)
  @CheckPermissions([PERMISSION_ACTION.View, ENTITIES.User])
  public async fetchUserById(@Res() response, @Param('user_id') user_id: string) {
    try {
      const users = await this.usersService.fetchUserById(user_id);
      return response.status(HttpStatus.OK).send(users);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message });
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
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(AuthExceptionFilter)
  @CheckPermissions([PERMISSION_ACTION.Update, ENTITIES.User])
  public async updateUser(@Res() response, @Body() body, @Param('user_id') user_id: string) {
    try {
      const users = await this.usersService.updateUser(body, user_id);
      return response.status(HttpStatus.OK).send(users);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message });
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
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(AuthExceptionFilter)
  @CheckPermissions([PERMISSION_ACTION.Create, ENTITIES.User])
  public async createUser(@Res() response, @Body() body) {
    try {
      const users = await this.usersService.createUser(body);
      return response.status(HttpStatus.OK).send(users);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message });
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
    summary: `This api is used to Delete user`,
  })
  @ApiResponse({
    description: 'Refer to the User schema'
  })
  @Delete('/:user_id')
  @UseGuards(AuthGuard('jwt'))
  @UseFilters(AuthExceptionFilter)
  @CheckPermissions([PERMISSION_ACTION.Delete, ENTITIES.User])
  public async deleteUserById(@Req() request: Request, @Res() response, @Param('user_id') user_id: string) {
    try {      
      const users = await this.usersService.deleteUserById(user_id, request["user"]);
      return response.status(HttpStatus.OK).send(users);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message });
    }
  }

}
