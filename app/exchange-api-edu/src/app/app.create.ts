import { INestApplication, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';

export function appCreate(app: INestApplication): void {
  /*
   * Setup AWS SDK used for uploadingg files to AWS S3
   * */
  const configService = app.get(ConfigService);

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
      whitelist: true,
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
    .setTitle('Astoria EDU API Documentation')
    .setDescription('Astoria EDU Exchange API Documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
