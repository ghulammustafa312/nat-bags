// src/category/category.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @ApiProperty({ description: 'Name of the category', example: 'Men' })
  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @ApiProperty({
    description: 'Image URL of the category',
    example: '/assets/images/category-images/hero-image-men-1.png',
  })
  @IsNotEmpty()
  @IsString()
  img: string;
}
