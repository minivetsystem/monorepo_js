import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import mongooseLeanGetters from "mongoose-lean-getters";
import config from "../config/configuration";
import { AppController } from "./app.controller";

/*
 * Importing Application Modules
 * */
import { UsersModule } from "../users/users.module";
import { VendorsModule } from "../vendors/vendors.module";
import { AuthModule } from "../auth/auth.module";
import { AdminsModule } from "../admins/admins.module";
import { SearchesModule } from "../searches/searches.module";

import { Role, RoleSchema } from "../auth/schemas";
import { ProfileTab, ProfileTabSchema } from "../auth/schemas";
import { ProfileTabSetting, ProfileTabSettingSchema } from "../auth/schemas";
import { EntitySetting, EntitySettingSchema } from "../auth/schemas";

@Module({
  imports: [
    // Importing the NestJS config module
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),

    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema },
      { name: ProfileTab.name, schema: ProfileTabSchema },
      { name: ProfileTabSetting.name, schema: ProfileTabSettingSchema },
      { name: EntitySetting.name, schema: EntitySettingSchema }
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
        ConfigModule
      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
        useCreateIndex: true,
        autoIndex: true,
        connectionFactory: (connection) => {
          /*
           * Add all Mongoose plugins here, plugins added globally to all Schemas
           * */
          connection.plugin(mongooseLeanGetters);
          return connection;
        }
      })
    }),

    /*
     * Import Application Modules Needed By NestJS
     * */
    UsersModule,
    AuthModule,
    VendorsModule,
    AdminsModule,
    SearchesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
