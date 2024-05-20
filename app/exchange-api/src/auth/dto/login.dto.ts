import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * This is the login dto
 */
export class LoginDto {
  /**
   * Username of the user.
   */
  @ApiProperty()
  @IsNotEmpty()
  username: string;

  /**
   * password for the user
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message: 'The login credentials are not correct',
  })
  password: string;
}
