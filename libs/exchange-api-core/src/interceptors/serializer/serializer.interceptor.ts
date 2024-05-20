import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

// Create a cutom decorators to user the Serialize Interceptor Class
export function Serialize(dto: any) {
  return UseInterceptors(new SerializerInterceptor(dto));
}

/*
 * @Class: SerializerInterceptor
 * The SerializerInterceptor class intercepts and excludes the properties
 * that are not supposed to be exposed publically
 * */
@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  // Add a constructor
  constructor(private dto: any) {}

  // The actualy interceptor
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Code that is executed before method execution
    return next.handle().pipe(
      map((data) => {
        // Code that is executed before the response is sent out
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
