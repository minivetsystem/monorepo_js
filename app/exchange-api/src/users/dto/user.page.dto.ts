import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../schemas';

/**
 * This class represents the page dto for the user listing.
 */
export class UserPageDto {

   constructor(data: User[], totalPages: number) {
    this.totalPages = totalPages;
    this.users = data;
   }

  /**
   * This represents first_name for the user.
   */
  @ApiProperty()
  totalPages: number;
  /**
   * This represents first_name for the user.
   */
  @ApiProperty()
  nextPageOffset: number;
  /**
   * This represents the data for the page
   */
  @ApiProperty()
  @IsNotEmpty()
  users: User[];

}