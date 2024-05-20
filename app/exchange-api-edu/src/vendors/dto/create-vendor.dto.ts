import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * This class represents the dto for creating new vendor
 */
export class CreateVendorDto {
  /**
   * First name of the vendor.
   */
  @ApiProperty()
  @IsNotEmpty()
  first_name: string;
  /**
   * Last name of the vendor.
   */
  @ApiProperty()
  @IsNotEmpty()
  last_name: string;
  /**
   * Email for the vendor.
   */
  @ApiProperty()
  @IsNotEmpty()
  email: string;
  /**
   * Password for the vendor.
   */
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  /**
   * This represents the user_id of the user.
   */
  @ApiProperty()
  @IsNotEmpty()
  user_id: string;
}
