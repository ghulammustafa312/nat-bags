// src/category/category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDto } from 'src/dto/category,dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UsersService } from './user.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly userService: UsersService,
  ) {}

  async getAllCart(userId: string): Promise<any> {
    const user = await this.userService.findOne(userId);
    return user.cart;
  }

  async addToCart(payload: any, userId: string): Promise<any> {
    try {
      const cart = await this.getAllCart(userId);
      cart.push({
        ...payload,
        createdAt: new Date(),
        updatedAt: new Date(),
        qty: 1,
      });
      await this.userModel.findByIdAndUpdate(userId, { cart });
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }
  async removeItem(productId: string, userId: string): Promise<any> {
    try {
      const cart = await this.getAllCart(userId);
      const updatedCart = cart.filter((c) => c._id !== productId);
      await this.userModel.findByIdAndUpdate(userId, { cart: updatedCart });
      return updatedCart;
    } catch (err) {
      throw new Error(err);
    }
  }
  async updateCartItem(
    productId: string,
    userId: string,
    payload: any,
  ): Promise<any> {
    try {
      const cart = await this.getAllCart(userId);
      const { action } = payload;
      const productIndex = cart.findIndex((c) => c._id === productId);
      if (productIndex !== -1) {
        cart[productIndex].qty =
          action.type === 'increment'
            ? cart[productIndex].qty + 1
            : cart[productIndex].qty - 1;
        cart[productIndex].updatedAt = new Date();
        await this.userModel.findByIdAndUpdate(userId, { cart: cart });
      }
      return cart;
    } catch (err) {
      throw new Error(err);
    }
  }
  async clearCart(userId: string): Promise<any> {
    await this.userModel.findByIdAndUpdate(userId, { cart: [] });
    return [];
  }
}
