import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsEnum,
  IsPhoneNumber,
  IsStrongPassword,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './user.dto';
import { USER_ROLE } from 'src/constants/enums';

export class CreateUserDto {
  @ApiProperty({ type: String })
  @IsString()
  readonly name: string;

  @ApiProperty({ type: String })
  @IsEmail()
  readonly email: string;
  @ApiProperty({ type: String })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ type: [AddressDto] })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  readonly addresses: AddressDto[];

  @ApiProperty({ enum: USER_ROLE })
  @IsEnum(USER_ROLE)
  readonly role: string;

  @ApiProperty({ type: String, example: '+923123456789' })
  @IsPhoneNumber()
  readonly phoneNo: string;
}

export class LoginDto {
  @ApiProperty({ type: String, required: true })
  @IsEmail()
  email: string;
  @ApiProperty({ type: String, required: true })
  @IsStrongPassword()
  password: string;
}
