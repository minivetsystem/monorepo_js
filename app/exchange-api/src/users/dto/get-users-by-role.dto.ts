import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetUsersByRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  role_name: string;

  @ApiProperty()
  @IsOptional()
  include_disabled: boolean;
}