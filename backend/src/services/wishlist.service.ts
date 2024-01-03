// src/category/category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDto } from 'src/dto/category,dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UsersService } from './user.service';

@Injectable()
export class WishListService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly userService: UsersService,
  ) {}

  async getWishlistItems(userId: string): Promise<any> {
    const user = await this.userService.findOne(userId);
    return user.wishlist;
  }

  async addToWishList(payload: any, userId: string): Promise<any> {
    try {
      const wishlist = await this.getWishlistItems(userId);
      wishlist.push({
        ...payload,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await this.userModel.findByIdAndUpdate(userId, { wishlist });
      return wishlist;
    } catch (err) {
      throw new Error(err);
    }
  }
  async deleteWishlist(productId: string, userId: string): Promise<any> {
    try {
      const wishlist = await this.getWishlistItems(userId);
      const updatedWishlist = wishlist.filter((c) => c._id !== productId);
      await this.userModel.findByIdAndUpdate(userId, {
        wishlist: updatedWishlist,
      });
      return updatedWishlist;
    } catch (err) {
      throw new Error(err);
    }
  }
}
