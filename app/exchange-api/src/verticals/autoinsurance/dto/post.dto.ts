import { ApiProperty } from "@nestjs/swagger";
import { PingDto } from "./ping.dto";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class PostDto extends PingDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(132)
    confirmation_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(10)
    primary_phone: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @Length(10)
    secondary_phone: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    driver1_firstname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    driver1_lastname: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    driver2_firstname: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    driver2_lastname: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    driver3_firstname: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    driver3_lastname: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    driver4_firstname: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    driver4_lastname: string;
}