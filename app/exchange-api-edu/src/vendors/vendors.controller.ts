import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus, Param, UseGuards
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { VendorsService } from './vendors.service';
import { ConfigService } from "@nestjs/config";
import { CreateApiKeyDto } from "./dto/create-api-key.dto";
import { CreateVendorDto } from "./dto/create-vendor.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('vendors')
@ApiTags('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService,
    private readonly  configService: ConfigService) {}

  /**
  * This api is used to create a new api key for the vendor.
  * @param response response for the api.
  * @param param vendor id
  * @param body create api key body
  * @returns vendor api key response.
  */
  @ApiResponse({
  status: 201,
  description: 'The record has been successfully created.',
  })
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
  summary: `This api is used to add a new api key for the vendor.`,
  })
  @ApiBody({
    description: 'Refer to the vendor schema',
  })
  @UseGuards(AuthGuard())
  @Post('/:vendor_id/create-api-key')
  public async createApiKey(@Res() response, @Param() param: { vendor_id: string }, @Body() body: CreateApiKeyDto) {

    const vendor = await this.vendorsService.createApiKey(param.vendor_id, body);

    return response.status(HttpStatus.OK).send(vendor);
  }

  /**
  * This api is used to create a new vendor.
  * @param response response for the api.
  * @param param vendor id
  * @param body create api key body
  * @returns vendor api key response.
  */
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    })
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
    summary: `This api is used to create a new vendor.`,
    })
    @ApiBody({
      description: 'Refer to the vendor schema',
    })
    @Post('/')
    public async create(@Res() response, @Body() body: CreateVendorDto) {
      try {
        const vendor = await this.vendorsService.createVendor(body);
        return response.status(HttpStatus.OK).send(vendor);
      } catch (err) {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: err});
      }
    }
}
