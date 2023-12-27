import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { hash } from 'bcrypt';
import { UsersService } from 'src/services/user.service';
import { CreateUserDto, LoginDto } from 'src/dto/auth.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const { password, ...rest } = createUserDto;
    const saltOrRounds = 10;
    const hashedPassword = await hash(password, saltOrRounds);
    return this.usersService.create({ ...rest, password: hashedPassword });
  }

  @Post('/login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Invalid Credentials');
    return this.authService.login(user);
  }

  @Get('protected')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async get(@Req() req: any) {
    return req.user;
  }
}
