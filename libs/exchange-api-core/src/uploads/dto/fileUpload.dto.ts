import { IsNotEmpty, MinLength, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fieldname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  originalname: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  encoding: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mimetype: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  filename: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  size: number;
}
