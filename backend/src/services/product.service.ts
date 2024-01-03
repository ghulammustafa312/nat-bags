// src/product/product.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { ProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { CategoryService } from './category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly categoryService: CategoryService,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    try {
      return this.productModel.aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'category',
          },
        },
        {
          $unwind: {
            path: '$category',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $addFields: {
            category_name: '$category.categoryName',
          },
        },
        {
          $project: {
            category: 0,
          },
        },
      ]);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getProductById(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async createProduct(product: ProductDto): Promise<Product> {
    const { categoryId } = product;
    await this.categoryService.getCategoryById(categoryId);
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async updateProduct(
    productId: string,
    updateData: UpdateProductDto,
  ): Promise<Product> {
    const { categoryId } = updateData;
    if (categoryId) await this.categoryService.getCategoryById(categoryId);
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(productId, updateData, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return updatedProduct;
  }

  async deleteProduct(productId: string): Promise<void> {
    const deletedProduct = await this.productModel
      .findByIdAndDelete(productId)
      .exec();
    if (!deletedProduct) {
      throw new NotFoundException('Product not found');
    }
  }
}
