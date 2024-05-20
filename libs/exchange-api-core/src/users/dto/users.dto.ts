import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength
} from "class-validator";

export class UsersDto {
  @ApiProperty()
  @IsEmail()
  @MinLength(4)
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @MinLength(8)
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*~`()+=?<>;':"/\\|,.{}\][]).{8,32}$/,
    {
      message:
        `Password must have minimum 8 charaters with at least one number, capital letter and special charecter`
    }
  )
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MaxLength(256)
  firstName: string;

  @ApiProperty()
  @MaxLength(256)
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsUrl()
  @IsOptional()
  profileImage: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isOwner: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  emailVerified: boolean;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  emailVerificationDate: Date;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  deletedAt: Date;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isVendor: boolean;
}
