import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  @IsString()
  file: any;
}