import {
    Body,
    Controller, HttpStatus,
    Post, Res,
    UseGuards
  } from "@nestjs/common";
  import {
    ApiBearerAuth,
    ApiHeaders,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
  import { AuthService } from './auth.service';
  import { AuthGuard } from '@nestjs/passport';
  import { GetUser } from '../decorators/get-user.decorator';
  import { LoginDto } from './dto/login.dto';
  import { User } from '../users/schemas';
  
  /**
   * This is the main auth controller.
   */
  @Controller('auth')
  @ApiTags('authentication')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    /**
     * This api is used to login the user.
     * @param response
     * @param body
     */
    @Post('/login')
    @ApiResponse({
      status: 201,
      description: 'You have been logged in successfully',
    })
    @ApiResponse({
      status: 400,
      description: 'The login credentials are not correct',
    })
    @ApiResponse({
      status: 401,
      description: 'You are not authorized to add a new user',
    })
    @ApiOperation({
      summary: `Checks user credentials and logs in user. Returns an accessToken.
      Please note: The accessToken needs to be refreshed before every 15 minutes
      (900 seconds)
      `,
    })
    public async login(@Res() response, @Body() body: LoginDto) {
      try {
        const authUser = await this.authService.authenticate(body);
        return response.status(HttpStatus.OK).send(authUser);
      } catch (err) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
      }
    }
  
    /**
     * This api is used to fetch the refresh token.
     * @param user
     */
    @UseGuards(AuthGuard())
    @ApiOperation({
      summary: `Endpoint to refresh user's accessToken.`,
    })
    @ApiResponse({
      status: 201,
      description: 'New access token generated successfully',
    })
    @ApiResponse({
      status: 401,
      description: 'You are not authorized to generate the token',
    })
    @ApiHeaders([{ name: 'Authorization', description: 'Bearer Token' }])
    @ApiBearerAuth('Authorization')
    @Post('/refresh-token')
    public refreshToken(@GetUser() user: User) {
      try {
        return this.authService.refreshToken(user);
      } catch (error) {
        return error;
      }
    }
  }
  