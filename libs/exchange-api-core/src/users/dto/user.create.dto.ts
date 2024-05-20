import { PickType } from '@nestjs/swagger';
import { UsersDto } from './users.dto';

export class UserCreateDto extends PickType(UsersDto, [
  'email',
  'password',
  'firstName',
  'lastName',
] as const) {}
