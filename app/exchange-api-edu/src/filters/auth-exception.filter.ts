import { BaseExceptionFilter } from "@nestjs/core";
import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';

/**
 * This is the special filter written to handle the authorization error.
 */
@Catch(HttpException)
export class AuthExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.getResponse()['message'] ? exception.getResponse()['message'] : exception.getResponse()
    });

    super.catch(exception, host);
  }
}
