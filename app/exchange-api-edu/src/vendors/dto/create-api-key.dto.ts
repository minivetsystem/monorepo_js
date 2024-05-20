import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * This class represents the dto for creating api key.
 */
export class CreateApiKeyDto {
  /**
   * This represents the user_id of the user.
   */
  @ApiProperty()
  @IsNotEmpty()
  user_id: string;
}
