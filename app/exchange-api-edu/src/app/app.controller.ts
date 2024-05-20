import {
  Controller,
  Get,
  Res,
  HttpStatus,
  UseGuards,
  Query
} from "@nestjs/common";
import { AppService } from './app.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { Role } from "../auth/schemas";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";

@Controller('app')
@ApiTags('app')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Get('/')
  getData() {
    return this.appService.getData();
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
  @Get('/profile-tabs')
  @UseGuards(AuthGuard('jwt'))
  public async fetchProfileTabsForRole(@Res() response, @Query('role') role: string) {
    try {
      const tabs = await this.appService.fetchProfileTabsForRole(role);
      return response.status(HttpStatus.OK).send(tabs);
    } catch (err) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err.message});
    }
  }
}
