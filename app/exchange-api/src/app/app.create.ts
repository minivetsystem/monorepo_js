import { INestApplication, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

/**
 * This function contains the config settings for the app.
 */
export function appCreate(app: INestApplication): void {
  /*
   * Enable CORS
   * */
  app.enableCors();

  /*
   * Use Helmet to protect from know vulnerabilities
   * */
  app.use(helmet());

  /*
   * Enable CSRF protection
   * TODO: Check if this is needed when using forms
   * */

  /*
   * Setting up the validation pipe for NestJs
   * */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
    }),
  );

  /**
   * Increasing the JSON request body limit
   */
  app.use(bodyParser.json({ limit: '1mb' }));
  // app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

  /*
   * Setting up the Swagger Documentation for the application
   * */
  const config = new DocumentBuilder()
    .setTitle('Astoria API Documentation')
    .setDescription('Astoria Exchange API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
