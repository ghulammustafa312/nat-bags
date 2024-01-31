import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderDto } from 'src/dto/order.dto';
import { Order } from 'src/schemas/order.schema';
import { OrderService } from 'src/services/order.service';

@Controller('orders')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly OrderService: OrderService) {}

  @Get()
  getAllCategories(): Promise<Order[]> {
    return this.OrderService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param('id') id: string): Promise<Order> {
    return this.OrderService.getOrderById(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  createOrder(@Body() OrderDto: OrderDto, @Req() req: any): Promise<Order> {
    return this.OrderService.createOrder({ ...OrderDto, userId: req.user._id });
  }
}
