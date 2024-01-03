// src/category/category.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDto } from 'src/dto/category,dto';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UsersService } from './user.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly userService: UsersService,
  ) {}

  async getAddress(userId: string): Promise<any> {
    const user = await this.userService.findOne(userId);
    return user.addresses;
  }

  async addAddress(payload: any, userId: string): Promise<any> {
    try {
      const addresses = await this.getAddress(userId);
      addresses.push({
        ...payload,
        createdAt: new Date(),
        updatedAt: new Date(),
        _id: new Types.ObjectId(),
      });
      await this.userModel.findByIdAndUpdate(userId, { addresses });
      return addresses;
    } catch (err) {
      throw new Error(err);
    }
  }
  async updateAddress(
    addressId: string,
    userId: string,
    payload: any,
  ): Promise<any> {
    try {
      const addresses = await this.getAddress(userId);
      const addressIndex = addresses.findIndex(
        (c) => c?._id?.toString() === addressId,
      );
      if (addressIndex > -1) {
        addresses[addressIndex] = payload;
        await this.userModel.findByIdAndUpdate(userId, {
          addresses,
        });
      }
      return addresses;
    } catch (err) {
      throw new Error(err);
    }
  }
  async deleteAddress(addressId: string, userId: string): Promise<any> {
    try {
      const addresses = await this.getAddress(userId);
      const updatedAddresses = addresses.filter(
        (c) => c?._id?.toString() !== addressId,
      );
      await this.userModel.findByIdAndUpdate(userId, {
        addresses: updatedAddresses,
      });
      return updatedAddresses;
    } catch (err) {
      throw new Error(err);
    }
  }
}
