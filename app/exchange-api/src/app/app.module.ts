import { MiddlewareConsumer, Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongooseLeanGetters from 'mongoose-lean-getters';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import LogsMiddleware from '../middleware/logs.middleware';
import { LoggerModule } from 'nestjs-pino';

/*
 * Importing Application Modules
 * */
import { AuthModule } from '../auth/auth.module';
import { CaslModule } from '../casl/casl.module';
import { UsersModule } from '../users/users.module';
import { CampaignModule } from '../campaigns/campaigns.module';
import { SettingsModule } from '../settings/settings.module';
import { SettingsService } from '../settings/settings.service';
import { ScheduleModule } from '@nestjs/schedule';
import { LeadsModule } from '../verticals/autoinsurance/leads.module';
import { ReportsModule } from '../reports/autoinsurance/reports.module';
import { Entity, EntitySchema, EntitySetting, EntitySettingSchema, ProfileTab, ProfileTabSchema, ProfileTabSetting, ProfileTabSettingSchema, Role, RoleSchema } from '../auth/schemas';
import { LeadType, LeadTypeSchema } from '../verticals/autoinsurance/schemas';
import {EducationCampaignsModule} from "../education-campaigns/education-campaigns.module";
import {EducationModule} from "../verticals/education/education.module";
import {EducationReportsModule} from "../reports/education/education-reports.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'error'
      },
    }),
    // Importing the event emitter module
    EventEmitterModule.forRoot(),
    // Importing the NestJS config module
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: Entity.name, schema: EntitySchema },
      { name: EntitySetting.name, schema: EntitySettingSchema },
      { name: ProfileTab.name, schema: ProfileTabSchema },
      { name: ProfileTabSetting.name, schema: ProfileTabSettingSchema },
      { name: LeadType.name, schema: LeadTypeSchema }
    ]),
    /*
     * Instantiating the Mongoose module and passing in the
     * MongoDB configuration to connect the MongoDB database
     * */
    MongooseModule.forRootAsync({
      imports: [
        /*
         * Importing ConfigModule to trigger MongoDB
         * */
        ConfigModule,
      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        connectionFactory: (connection) => {
          /*
           * Add all Mongoose plugins here, plugins added globally to all Schemas
           * */
          connection.plugin(mongooseLeanGetters);
          return connection;
        },
      }),
    }),
    /*
     * Import Application Modules Needed By NestJS
     * */
    AuthModule,
    CaslModule,
    UsersModule,
    CampaignModule,
    SettingsModule,
    LeadsModule,
    ReportsModule,
    EducationCampaignsModule,
    EducationModule,
    EducationReportsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {

  constructor(private settingService: SettingsService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LogsMiddleware)
      .forRoutes('*');
  }

  onModuleInit() {
    this.settingService.load();
  }
}
