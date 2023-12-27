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
console.log(process.env.MONGODB_ENV);
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nat-bags'),
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController, AuthController],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    AppService,
    AuthService,
    UsersService,
    JwtStrategy,
  ],
})
export class AppModule {}
