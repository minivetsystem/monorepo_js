import { Mongoose } from 'mongoose';
import { ConfigService } from '@nestjs/config';

/**
 * This will clear all the collections from database except roles & permissions
 */
export async function clearMongoDatabase(config: ConfigService): Promise<void> {
  const mongoose = new Mongoose();
  await mongoose.connect(config.get<string>('MONGODB_URI'));
  await mongoose.connection.db.dropDatabase();
  return Promise.resolve();
}
