// src/category/category.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddressService } from 'src/services/address.service';

// Importing necessary decorators and classes from NestJS and Swagger
@Controller('address')
@ApiTags('Address')
@ApiBearerAuth()
export class AddressController {
  // Constructor that injects the AddressService
  constructor(private readonly addressService: AddressService) {}

  // GET request handler to retrieve addresses for the authenticated user
  @Get()
  @UseGuards(AuthGuard('jwt')) // Applying JWT authentication guard
  getAddress(@Req() { user }): Promise<any[]> {
    // Calling the service to get addresses for the authenticated user
    return this.addressService.getAddress(user._id);
  }

  // POST request handler to add a new address for the authenticated user
  @Post('')
  @UseGuards(AuthGuard('jwt')) // Applying JWT authentication guard
  addAddress(@Body() payload: any, @Req() { user }): Promise<any> {
    // Calling the service to add a new address for the authenticated user
    return this.addressService.addAddress(payload?.address, user._id);
  }

  // PUT request handler to update an address for the authenticated user
  @Put(':addressId')
  @UseGuards(AuthGuard('jwt')) // Applying JWT authentication guard
  updateAddress(
    @Body() payload: any,
    @Param('addressId') addressId: string,
    @Req() { user },
  ): Promise<any> {
    // Calling the service to update an address for the authenticated user
    return this.addressService.updateAddress(
      addressId,
      user._id,
      payload?.address,
    );
  }

  // DELETE request handler to delete an address for the authenticated user
  @Delete(':addressId')
  @UseGuards(AuthGuard('jwt')) // Applying JWT authentication guard
  deleteAddress(
    @Param('addressId') addressId: string,
    @Req() { user },
  ): Promise<any> {
    // Calling the service to delete an address for the authenticated user
    return this.addressService.deleteAddress(addressId, user._id);
  }
}
