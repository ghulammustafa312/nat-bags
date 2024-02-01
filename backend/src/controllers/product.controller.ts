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

// Importing necessary decorators and classes from NestJS and Swagger
@Controller('products')
@ApiTags('Products')
export class ProductController {
  // Constructor that injects the ProductService
  constructor(private readonly productService: ProductService) {}

  // GET request handler to retrieve all products
  @Get()
  getAllProducts(): Promise<Product[]> {
    // Calling the service to get all products
    return this.productService.getAllProducts();
  }

  // GET request handler to retrieve a product by ID
  @Get(':id')
  getProductById(@Param('id') id: string): Promise<Product> {
    // Calling the service to get a product by ID
    return this.productService.getProductById(id);
  }

  // POST request handler to create a new product
  @Post()
  createProduct(@Body() product: ProductDto): Promise<Product> {
    // Calling the service to create a new product
    return this.productService.createProduct(product);
  }

  // PUT request handler to update a product by ID
  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateData: UpdateProductDto,
  ): Promise<Product> {
    // Calling the service to update a product by ID
    return this.productService.updateProduct(id, updateData);
  }

  // POST request handler to add a review to a product
  @Post(':id/review')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) // Applying JWT authentication guard
  addReview(
    @Param('id') id: string,
    @Body() updateData: AddReviewDto,
    @Req() req: any,
  ): Promise<any> {
    // Calling the service to add a review to a product
    return this.productService.addReview(id, {
      ...updateData,
      userId: req?.user?._id,
      user: {
        firstName: req?.user?.firstName,
        lastName: req?.user?.lastName,
      },
    });
  }

  // DELETE request handler to delete a product by ID
  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<void> {
    // Calling the service to delete a product by ID
    return this.productService.deleteProduct(id);
  }
}
