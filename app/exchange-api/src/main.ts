/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { appCreate } from './app/app.create';
import { LOCAL_ENV } from './config/constants';

/**
 * Calling this function to start the app.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: false });
  app.enableCors({
    exposedHeaders: 'api-version'
  });

  // Disable logging in local .env.
  if(process.env.ENV !== LOCAL_ENV) {
    app.useLogger(app.get(Logger));
  }

  // Add required middleware to the app
  appCreate(app);

  /*
   * Setting the global prefix for the api enpoints
   * */
  const port = process.env.PORT || 3333;
  await app.listen(port);
}

bootstrap();
