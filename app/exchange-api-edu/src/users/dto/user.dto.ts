import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * This class represents the dto for the create user.
 */
export class UserDto {
  /**
   * This represents first_name for the user.
   */
  @ApiProperty()
  @IsNotEmpty()
  first_name: string;

  /**
   * This represents the last_name for the user.
   */
  @ApiProperty()
  @IsNotEmpty()
  last_name: string;
  /**
   * This represents the email for the user.
   */
  @ApiProperty()
  @IsNotEmpty()
  email: string;
  /**
   * This represents the encrypted password for the user.
   */
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
