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
import { WishListService } from 'src/services/wishlist.service';

@Controller('wishlist')
@ApiTags('Wishlist')
@ApiBearerAuth()
export class WishListController {
  constructor(private readonly wishListService: WishListService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getWishlistItems(@Req() { user }): Promise<any[]> {
    return this.wishListService.getWishlistItems(user._id);
  }

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  addToWishList(@Body() payload: any, @Req() { user }): Promise<any> {
    return this.wishListService.addToWishList(payload?.product, user._id);
  }

  @Delete(':productId')
  @UseGuards(AuthGuard('jwt'))
  deleteWishlist(
    @Param('productId') productId: string,
    @Req() { user },
  ): Promise<any> {
    return this.wishListService.deleteWishlist(productId, user._id);
  }
}
