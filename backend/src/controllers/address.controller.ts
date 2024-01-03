// src/category/category.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Patch,
  Delete,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddressService } from 'src/services/address.service';

@Controller('address')
@ApiTags('Address')
@ApiBearerAuth()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAddress(@Req() { user }): Promise<any[]> {
    return this.addressService.getAddress(user._id);
  }

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  addAddress(@Body() payload: any, @Req() { user }): Promise<any> {
    return this.addressService.addAddress(payload?.address, user._id);
  }

  @Put(':addressId')
  @UseGuards(AuthGuard('jwt'))
  updateAddress(
    @Body() payload: any,
    @Param('addressId') addressId: string,
    @Req() { user },
  ): Promise<any> {
    return this.addressService.updateAddress(
      addressId,
      user._id,
      payload?.address,
    );
  }

  @Delete(':addressId')
  @UseGuards(AuthGuard('jwt'))
  deleteAddress(
    @Param('addressId') addressId: string,
    @Req() { user },
  ): Promise<any> {
    return this.addressService.deleteAddress(addressId, user._id);
  }
}
