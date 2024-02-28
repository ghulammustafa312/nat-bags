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

// Importing necessary decorators and classes from NestJS and Swagger
@Controller('orders')
@ApiTags('Order')
export class OrderController {
  // Constructor that injects the OrderService
  constructor(private readonly orderService: OrderService) {}

  // GET request handler to retrieve all orders
  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getAllOrders(@Req() req: any): Promise<Order[]> {
    // Calling the service to get all orders
    let userId;
    const role=req?.user?._id;
    if(role==="user") userId=req?.user?._id;
    return this.orderService.getAllOrders(userId);
  }

  // GET request handler to retrieve an order by ID
  @Get(':id')
  getOrderById(@Param('id') id: string): Promise<Order> {
    // Calling the service to get an order by ID
    return this.orderService.getOrderById(id);
  }

  // POST request handler to create a new order
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt')) // Applying JWT authentication guard
  createOrder(@Body() orderDto: OrderDto, @Req() req: any): Promise<Order> {
    // Calling the service to create a new order
    return this.orderService.createOrder({ ...orderDto, userId: req.user._id });
  }
}
