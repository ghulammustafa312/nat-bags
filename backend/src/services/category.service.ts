// src/category/category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { CategoryDto } from 'src/dto/category,dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async getCategoryById(categoryId: string): Promise<Category> {
    const category = await this.categoryModel.findById(categoryId).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async createCategory(categoryDto: CategoryDto): Promise<Category> {
    const createdCategory = new this.categoryModel(categoryDto);
    return createdCategory.save();
  }
}
