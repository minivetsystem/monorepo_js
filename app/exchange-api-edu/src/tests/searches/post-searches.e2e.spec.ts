import {
  rootMongooseTestModule,
  closeInMongodConnection,
} from '../mongodb-in-memory';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { mockDeep } from 'jest-mock-extended';
import { appCreate } from '../../app/app.create';
import configuration from '../../config/configuration';
import {
  addVendorRequest
} from './request-data/post-add-vendor';
import { AppService } from "../../app/app.service";
import { AuthService } from "../../auth/auth.service";
import { UsersService } from "../../users/users.service";
import { AppModule } from "../../app/app.module";
import { AuthModule } from "../../auth/auth.module";
import { UsersModule } from "../../users/users.module";
import { VendorsModule } from "../../vendors/vendors.module";
import { Helpers } from '../helpers/helpers';
import { VendorsService } from "../../vendors/vendors.service";
import { Test, TestingModule } from '@nestjs/testing';
import { adminUserDefault, adminUserAdminDefault } from './searches.sample-data';
import { searchRequestDefault } from './request-data/post-search';
import { Utils } from '@monorepo/exchange-api-core';

export async function bootstrapNestForTesting(
  modules: any,
  services: any,
  appCreate: (app: INestApplication) => void,
): Promise<INestApplication> {
  // Injecting Depenedencies for Test Module
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: modules,
    providers: services,
  }).compile();

  // Instatiate the app
  // eslint-disable-next-line prefer-const
  const app: INestApplication = moduleFixture.createNestApplication();
  await appCreate(app);
  await app.init();

  return app;
}

describe('Searches API', () => {
  let app: INestApplication;
  let helpers: any;
  let configService: ConfigService;
  let admin: any;
  let vendor: any;
  let authToken: any;
  let partnerCode: any;
  let security_key: string;
  let api_key: string;
  let search_id: number;

  beforeAll(async () => {
    app = await bootstrapNestForTesting(
      [
        AppModule,
        AuthModule,
        UsersModule,
        VendorsModule,
        rootMongooseTestModule(),
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `${process.cwd()}/apps/exchange-api-edu/.env.test`,
          load: [configuration],
        }),
      ],
      [
        { provide: AppService, useValue: mockDeep<AppService>() },
        { provide: AuthService, useValue: mockDeep<AuthService>() },
        { provide: UsersService, useValue: mockDeep<UsersService>() },
        { provide: VendorsService, useValue: mockDeep<VendorsService>() }
      ],
      appCreate,
    );
    helpers = new Helpers(app);
    configService = app.get<ConfigService>(ConfigService);
    await helpers.clearAllVendorData();
    //Add Admin user.
    admin = await helpers.addAdminUser(adminUserDefault, adminUserAdminDefault);

    authToken = await helpers.callLogin({
      email: adminUserDefault.email,
      password: 'test@123'
    });
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('@POST /vendors - It should add a new vendor.', async () => {

    const response = await helpers.callAddVendorAPI({
      ...addVendorRequest,
      user_id: admin._id
    });

    vendor = response.body;

    //Api call should return success response.
    expect(response.status).toBe(HttpStatus.OK);
    //Api should return the added vendor back.
    expect(response.body._id).toBeDefined();
    //Checking if the added vendor is valid.
    expect(response.body.added_by).toEqual(admin._id.toString());
    //Check if the vendor has security key
    expect(response.body.security_key).toBeDefined();
    //Check if the vendor has security key
    expect(response.body.partner_code).toBeDefined();
  });

  it('@POST /vendors - Should fail to create vendor API KEY, Unauthorized', async () => {

    const response = await helpers.callCreateApiKey({
      vendor_id: vendor._id,
      user_id: admin._id
    });

    //Api call should return unauthorized error.
    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  it('@POST /vendors - Should create a new vendor api key.', async () => {

    const response = await helpers.callCreateApiKey({
      vendor_id: vendor._id,
      user_id: admin._id,
      authToken: authToken
    });

    partnerCode = response.body.partner_code;

    security_key = response.body.security_key;
    api_key = response.body.api_keys[0].api_key;

    //Api should return success.
    expect(response.status).toBe(HttpStatus.OK);
    //Api should create the key
    expect(response.body.api_keys).toBeDefined();
    //Api should create the key
    expect(response.body.api_keys.length).toBeGreaterThan(0);
  });

  it('@POST /searches - Should fail due to missing x-api-key & x-secret in search api', async () => {

    const response = await helpers.callSearchApi({
      ...searchRequestDefault,
      partner_code: partnerCode,
    });

    //Api should return unauthorized error.
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    //Should return error related to missing x-api-key & x-secret headers.
    expect(response.error.text).toEqual('No x-api-key and x-secret found.');
  });

  it('@POST /searches - Should send the search request to leadHoop and fail with BAD REQUEST', async () => {

    const response = await helpers.callSearchApi({
      ...searchRequestDefault,
      lead: {
        ...searchRequestDefault.lead,
        ip: 'in-valid'
      },
      partner_code: partnerCode,
      security_key,
      api_key
    });

    //Api should fail with bad request.
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    //Check if the errors are returned by leadHoop
    expect(response.body.error.response.errors).toBeDefined();
    //Check if the in-valid ip address error is returned.
    expect(response.body.error.response.errors['lead[ip]']).toBeDefined();
  });
  
  it('@POST /searches - Should send the search request to leadHoop and fail with required field error', async () => {

    const response = await helpers.callSearchApi({
      ...searchRequestDefault,
      lead: {
        ...searchRequestDefault.lead,
        email: undefined,
        ip: '198.168.1.3',
        phone1: '(917) 123-45667'
      },
      lead_address: {
        ...searchRequestDefault.lead_address,
        zip: 19873
      },
      lead_education: {
        ...searchRequestDefault.lead_education,
        grad_year: 2017
      },
      partner_code: partnerCode,
      security_key,
      api_key
    });

    //Api should pass.
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    //Check if we have received the search result.
    expect(response.body.error.response.errors['lead[email]'][0]).toEqual('This field is required.');

  });

  it('@POST /searches - Should send the search request to leadHoop and should return SUCCESS', async () => {

    const response = await helpers.callSearchApi({
      ...searchRequestDefault,
      lead: {
        ...searchRequestDefault.lead,
        email: `${Math.random().toString(36).substring(2,7)}k@gmail.com`,
        ip: '198.168.1.3',
        phone1: '(917) 123-45667'
      },
      lead_address: {
        ...searchRequestDefault.lead_address,
        zip: 19873
      },
      lead_education: {
        ...searchRequestDefault.lead_education,
        grad_year: 2017
      },
      partner_code: partnerCode,
      security_key,
      api_key
    });

    search_id = response.body.search_id;

    //Api should pass.
    expect(response.status).toBe(HttpStatus.OK);
    //Check if we have received the search result.
    expect(response.body.search_id).toBeDefined();
    //Check if we have recieved the search offers.
    expect(response.body.timestamp).toBeDefined();
  });

  it('@GET /searches/results - Should send the search result request to leadHoop and should fail with BAD REQUEST', async () => {
    const response = await helpers.callResultApi({
      searchId: search_id
    });

    //Api should fail.
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);

  });

  it('@GET /searches/results - Should send the search result request to leadHoop and should fail for invalid search id', async () => {
    const response = await helpers.callResultApi({
      searchId: 'Invalid',
      security_key,
      api_key
    });

    //Api should pass.
    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.errors.search_id).toEqual(["Not a valid search id"]);
    expect(response.body.success).toEqual(false);
  });

  it('@GET /searches/results - Should send the search result request to leadHoop and should return SUCCESS', async () => {
    const response = await helpers.callResultApi({
      searchId: search_id,
      security_key,
      api_key
    });

    //Api should pass.
    expect(response.status).toBe(HttpStatus.OK);
    //Check if we have received the search result.
    expect(response.body.offers).toBeDefined();
    //Check if we have recieved the search offers.
    expect(response.body.success).toBeDefined();
  }, 20000);
});
