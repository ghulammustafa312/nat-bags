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
import { CategoryDto } from 'src/dto/category,dto';
import { Category } from 'src/schemas/category.schema';
import { CartService } from 'src/services/cart.service';
import { CategoryService } from 'src/services/category.service';

@Controller('cart')
@ApiTags('Cart')
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getCartItems(@Req() { user }): Promise<any[]> {
    return this.cartService.getAllCart(user._id);
  }

  @Post('')
  @UseGuards(AuthGuard('jwt'))
  addToCart(@Body() payload: any, @Req() { user }): Promise<any> {
    return this.cartService.addToCart(payload?.product, user._id);
  }

  @Put(':productId')
  @UseGuards(AuthGuard('jwt'))
  updateCartItem(
    @Body() payload: any,
    @Param('productId') productId: string,
    @Req() { user },
  ): Promise<any> {
    return this.cartService.updateCartItem(productId, user._id, payload);
  }
  @Delete(':productId')
  @UseGuards(AuthGuard('jwt'))
  deleteCartItem(
    @Param('productId') productId: string,
    @Req() { user },
  ): Promise<any> {
    return this.cartService.removeItem(productId, user._id);
  }
  @Post('clearCart')
  @UseGuards(AuthGuard('jwt'))
  clearCart(@Req() { user }): Promise<any> {
    return this.cartService.clearCart(user._id);
  }
}
