// Importing necessary modules and decorators from NestJS and Mongoose
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Importing DTO and schema classes
import { User, UserDocument } from 'src/schemas/user.schema';

// Importing the UsersService for user-related operations
import { UsersService } from './user.service';

// Injectable service for address-related operations
@Injectable()
export class AddressService {
  // Constructor that injects the User model and UsersService
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly userService: UsersService,
  ) {}

  // Method to retrieve addresses for a given user ID
  async getAddress(userId: string): Promise<any> {
    // Fetching the user and returning the addresses
    const user = await this.userService.findOne(userId);
    return user.addresses;
  }

  // Method to add a new address for a user
  async addAddress(payload: any, userId: string): Promise<any> {
    try {
      // Fetching existing addresses for the user
      const addresses = await this.getAddress(userId);

      // Adding a new address with metadata
      addresses.push({
        ...payload,
        createdAt: new Date(),
        updatedAt: new Date(),
        _id: new Types.ObjectId(),
      });

      // Updating the user document with the new addresses
      await this.userModel.findByIdAndUpdate(userId, { addresses });

      // Returning the updated addresses
      return addresses;
    } catch (err) {
      // Handling errors and throwing a custom error
      throw new Error(err);
    }
  }

  // Method to update an existing address for a user
  async updateAddress(
    addressId: string,
    userId: string,
    payload: any,
  ): Promise<any> {
    try {
      // Fetching existing addresses for the user
      const addresses = await this.getAddress(userId);

      // Finding the index of the address to be updated
      const addressIndex = addresses.findIndex(
        (c) => c?._id?.toString() === addressId,
      );

      // If address is found, updating it and saving changes
      if (addressIndex > -1) {
        addresses[addressIndex] = payload;
        await this.userModel.findByIdAndUpdate(userId, { addresses });
      }

      // Returning the updated addresses
      return addresses;
    } catch (err) {
      // Handling errors and throwing a custom error
      throw new Error(err);
    }
  }

  // Method to delete an address for a user
  async deleteAddress(addressId: string, userId: string): Promise<any> {
    try {
      // Fetching existing addresses for the user
      const addresses = await this.getAddress(userId);

      // Filtering out the address to be deleted
      const updatedAddresses = addresses.filter(
        (c) => c?._id?.toString() !== addressId,
      );

      // Updating the user document with the updated addresses
      await this.userModel.findByIdAndUpdate(userId, {
        addresses: updatedAddresses,
      });

      // Returning the updated addresses
      return updatedAddresses;
    } catch (err) {
      // Handling errors and throwing a custom error
      throw new Error(err);
    }
  }
}
