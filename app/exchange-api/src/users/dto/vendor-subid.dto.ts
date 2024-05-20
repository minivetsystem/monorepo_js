import { ApiProperty } from '@nestjs/swagger';

export class VendorSubIdDto {

  @ApiProperty()
  _id: string;

  @ApiProperty()
  sub_id: string;

  @ApiProperty()
  is_blocked: boolean;
  
}