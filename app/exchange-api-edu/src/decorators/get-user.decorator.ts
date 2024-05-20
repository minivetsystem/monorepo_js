import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../users/schemas';

/**
 * This function serves as the decorator the refresh token.
 */
export const GetUser = createParamDecorator(
  (data, context: ExecutionContext): User => {
    const req = context.switchToHttp().getRequest();
    return req.user;
  },
);
