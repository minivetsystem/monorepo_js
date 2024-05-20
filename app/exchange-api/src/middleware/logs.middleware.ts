import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
 
@Injectable()
class LogsMiddleware implements NestMiddleware {
 
  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, originalUrl } = request;
      const { statusCode, statusMessage } = response;
 
      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;
 

      return message;
    });
 
    next();
  }
}
 
export default LogsMiddleware;