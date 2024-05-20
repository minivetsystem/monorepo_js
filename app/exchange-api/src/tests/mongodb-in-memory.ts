import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

/**
 * This refers to the mongo server instance.
 */
let mongod: MongoMemoryServer;
/**
 * This constant is used to define the mongoose module which will be used for testing.
 */
export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
      mongod = await MongoMemoryServer.create();
      return {
        uri: config.get<string>('mongoURL'),
        ...options,
      };
    },
  });

/**
 * This is where we close the connection to mongodb.
 */
export const closeInMongodConnection = async () => {
  if (mongod) await mongod.stop();
};
