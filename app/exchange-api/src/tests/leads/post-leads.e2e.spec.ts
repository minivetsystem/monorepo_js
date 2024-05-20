import {
    rootMongooseTestModule,
    closeInMongodConnection,
  } from '../mongodb-in-memory';
  import { Test, TestingModule } from "@nestjs/testing";
  import { INestApplication, HttpStatus } from '@nestjs/common';
  import { LeadsModule } from '../../leads/leads.module';
  import { ConfigModule } from '@nestjs/config';
  import { mockDeep } from 'jest-mock-extended';
  import { LeadsService } from '../../leads/leads.service';
  import { appCreate } from '../../app/app.create';
  import configuration from '../../config/configuration';
  import {
    pingRequest
  } from './request-data/post-ping';
  import { AppService } from "../../app/app.service";
  import { AuthService } from "../../auth/auth.service";
  import { UsersService } from "../../users/users.service";
  import { AuthModule } from "../../auth/auth.module";
  import { UsersModule } from "../../users/users.module";
  import { Helpers } from '../helpers/helpers';
  import { RESPONSE_TYPE } from '../../config/constants';
import { randomUUID } from 'crypto';
import { times } from 'lodash';
  
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

  describe('Ping request API', () => {
    let app: INestApplication;
    let helpers: any;
  
    beforeAll(async () => {
      app = await bootstrapNestForTesting(
        [
          AuthModule,
          LeadsModule,
          UsersModule,
          rootMongooseTestModule(),
          ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `${process.cwd()}/apps/exchange-api/.env.test`,
            load: [configuration],
          }),
        ],
        [
          { provide: AppService, useValue: mockDeep<AppService>() },
          { provide: AuthService, useValue: mockDeep<AuthService>() },
          { provide: UsersService, useValue: mockDeep<UsersService>() },
          { provide: LeadsService, useValue: mockDeep<LeadsService>() },
        ],
        appCreate,
      );
      helpers = new Helpers(app);
    });
  
    afterAll(async () => {
      await closeInMongodConnection();
    });
  
    describe('call-ping-api', () => {
 
      it('@POST /leads/ping - It should be rejected because there are no' +
        ' bidders.', async () => {

        const campaignFields = await helpers.fetchCampaignFieldsForCampaign("64af73a036798f0dd93c44e6");
        expect(campaignFields.length).toBeGreaterThan(0);
  

        await Promise.all(times(5).map(async (n) => {
          const response = await helpers.callPingAPI({
            ...pingRequest,
          });

          if(n === 4) {
            expect(response.status).toBe(HttpStatus.OK);
            expect(response.body.response).toBe(RESPONSE_TYPE.Rejected);
            expect(response.body.confirmation).toBeDefined();
            expect(response.body.confirmation.length).toBeGreaterThan(0);
          }
        }));
    }, 200000);
  
    });
 
  });
  