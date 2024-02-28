// src/product/product.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/services/user.service';

// Importing necessary decorators and classes from NestJS and Swagger
@Controller('users')
@ApiTags('Users')
export class UserController {
  // Constructor that injects the ProductService
  constructor(private readonly userService: UsersService) {}

  // GET request handler to retrieve all users
  @Get()
  getAllUsers(): Promise<any> {
    // Calling the service to get all users
    return this.userService.findAllUsers();
  }
}
