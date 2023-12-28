// src/category/category.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Category {
  @Prop({ required: true })
  categoryName: string;

  @Prop({ required: true })
  img: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
