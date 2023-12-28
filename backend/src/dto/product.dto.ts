// src/product/product.dto.ts
import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsBoolean,
  IsString,
  Min,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';

export class ProductDto {
  @ApiProperty({
    description: 'Name of the product',
    example: 'Vanguard Elite',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Original price of the product', example: 149 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  original_price: number;

  @ApiProperty({ description: 'Discounted price of the product', example: 99 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  discounted_price: number;

  @ApiProperty({
    description: 'Category Id of the product',
    example: new Types.ObjectId(),
  })
  @IsNotEmpty()
  @IsMongoId()
  categoryId: string;

  @ApiProperty({
    description: 'Availability status of the product',
    example: false,
  })
  @IsBoolean()
  is_stock: boolean;

  @ApiProperty({ example: 50, type: Number })
  @IsNumber()
  @Min(10)
  stock: number;
  @ApiProperty({ description: 'Description of the product' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Trending status of the product', example: true })
  @IsBoolean()
  trending: boolean;

  @ApiProperty({
    description: 'Image URL of the product',
    example: '/assets/images/products-images/image-kids-1.png',
  })
  @IsNotEmpty()
  @IsString()
  img: string;
}

export class UpdateProductDto extends PartialType(ProductDto) {}
