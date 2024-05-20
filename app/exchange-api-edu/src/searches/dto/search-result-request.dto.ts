import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * This represents the dto for the search result request.
 */
export class SearchResultRequestDto {
  /**
   * Search ID (Returned during the initial search)
   */
  @ApiProperty()
  @IsNotEmpty()
  searchId: string;

   /**
   * Maximum amount of seconds user will have to wait for results
   */
  @ApiProperty()
  waitTime: string;
}