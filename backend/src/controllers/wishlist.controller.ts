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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WishListService } from 'src/services/wishlist.service';

// Importing necessary decorators and classes from NestJS and Swagger
@Controller('wishlist')
@ApiTags('Wishlist')
@ApiBearerAuth()
export class WishListController {
  // Constructor that injects the WishListService
  constructor(private readonly wishListService: WishListService) {}

  // GET request handler to retrieve wishlist items
  @Get()
  @UseGuards(AuthGuard('jwt')) // Applying JWT authentication guard
  getWishlistItems(@Req() { user }): Promise<any[]> {
    // Calling the service to get wishlist items for the authenticated user
    return this.wishListService.getWishlistItems(user._id);
  }

  // POST request handler to add a product to the wishlist
  @Post('')
  @UseGuards(AuthGuard('jwt')) // Applying JWT authentication guard
  addToWishList(@Body() payload: any, @Req() { user }): Promise<any> {
    // Calling the service to add a product to the wishlist for the authenticated user
    return this.wishListService.addToWishList(payload?.product, user._id);
  }

  // DELETE request handler to remove a product from the wishlist
  @Delete(':productId')
  @UseGuards(AuthGuard('jwt')) // Applying JWT authentication guard
  deleteWishlist(
    @Param('productId') productId: string,
    @Req() { user },
  ): Promise<any> {
    // Calling the service to delete a product from the wishlist for the authenticated user
    return this.wishListService.deleteWishlist(productId, user._id);
  }
}
