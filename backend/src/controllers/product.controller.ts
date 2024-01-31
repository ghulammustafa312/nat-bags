// src/product/product.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  AddReviewDto,
  ProductDto,
  UpdateProductDto,
} from 'src/dto/product.dto';
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

  @Post(':id/review')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  addReview(
    @Param('id') id: string,
    @Body() updateData: AddReviewDto,
    @Req() req: any,
  ): Promise<any> {
    return this.productService.addReview(id, {
      ...updateData,
      userId: req?.user?._id,
      user: {
        firstName: req?.user?.firstName,
        lastName: req?.user?.lastName,
      },
    });
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productService.deleteProduct(id);
  }
}
