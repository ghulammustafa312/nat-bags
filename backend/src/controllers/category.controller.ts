// src/category/category.controller.ts
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryDto } from 'src/dto/category,dto';
import { Category } from 'src/schemas/category.schema';
import { CategoryService } from 'src/services/category.service';

@Controller('categories')
@ApiTags('Category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string): Promise<Category> {
    return this.categoryService.getCategoryById(id);
  }

  @Post()
  createCategory(@Body() categoryDto: CategoryDto): Promise<Category> {
    return this.categoryService.createCategory(categoryDto);
  }
  @Delete(':id')
  deleteCategory(@Param('id') id: string): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}
