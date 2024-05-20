import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchLeadAddressDto {
  /**
   * The valid first line of the address of the customer.
   */
  @ApiProperty()
  address: string;
  /**
   * The valid second line of the address of the customer for example Apt/Floor/Suite. Cannot be the same as the address.
   */
  @ApiProperty()
  address2: string;
  /**
   * The zip code of the customer.
   */
  @ApiProperty()
  @IsNotEmpty()
  zip: string;
  /**
   * The city of the customer.
   */
  @ApiProperty()
  @IsNotEmpty()
  city: string;
  /**
   * The state of the customer selected from the list of states. All the states can be fetched from the the following api endpoint.
   */
  @ApiProperty()
  @IsNotEmpty()
  state: string;
}
