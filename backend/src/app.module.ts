import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthService } from './services/auth.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { HttpExceptionFilter } from './filters/exception.filter';
import { UsersService } from './services/user.service';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { ProductController } from './controllers/product.controller';
import { CategoryController } from './controllers/category.controller';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { Product, ProductSchema } from './schemas/product.schema';
import { Category, CategorySchema } from './schemas/category.schema';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';
import { WishListController } from './controllers/wishlist.controller';
import { WishListService } from './services/wishlist.service';
import { AddressController } from './controllers/address.controller';
import { AddressService } from './services/address.service';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { Order, OrderSchema } from './schemas/order.schema';
console.log(process.env.MONGODB_ENV);
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_ENV),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '7d' },
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  controllers: [
    AppController,
    AuthController,
    ProductController,
    CategoryController,
    CartController,
    WishListController,
    AddressController,
    OrderController,
  ].sort(),
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    AppService,
    AuthService,
    UsersService,
    ProductService,
    CategoryService,
    CartService,
    WishListService,
    AddressService,
    OrderService,
    JwtStrategy,
  ],
})
export class AppModule {}
