// src/product/product.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Category } from './category.schema';
import { User } from './user.schema';

export type ProductDocument = Product & Document;

@Schema({ versionKey: false, timestamps: true })
export class Review {
  @Prop({ type: String, required: true })
  feedback: string;
  @Prop({ type: Number, required: true })
  rating: string;
  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: User.name })
  userId: Types.ObjectId;

  @Prop({ type: SchemaTypes.Mixed, required: true })
  user: {
    firstName: string;
    lastName: string;
    // profileImage: string;
  };
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  original_price: number;

  @Prop({ required: true })
  discounted_price: number;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Category.name })
  categoryId: string;

  @Prop({ default: false })
  is_stock: boolean;
  @Prop({ required: true, min: 10, type: Number })
  stock: number;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  reviews: number;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false })
  trending: boolean;

  @Prop({ required: true })
  img: string;
  @Prop({ required: false, default: [], type: [ReviewSchema], _id: true })
  reviewsData: [Review];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
