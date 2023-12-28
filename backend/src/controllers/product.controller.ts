// src/product/product.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { Product } from 'src/schemas/product.schema';
import { ProductService } from 'src/services/product.service';

@Controller('products')
@ApiTags('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Post()
  createProduct(@Body() product: ProductDto): Promise<Product> {
    return this.productService.createProduct(product);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateData: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, updateData);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
