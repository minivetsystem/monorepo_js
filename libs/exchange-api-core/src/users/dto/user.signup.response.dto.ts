import { OmitType } from '@nestjs/swagger';
import { UsersDto } from './users.dto';

export class UserSignupResponseDto extends OmitType(UsersDto, [
  'password',
] as const) {}
