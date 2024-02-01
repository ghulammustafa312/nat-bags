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
  // Constructor that injects the AuthService and UsersService
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // POST request handler for user signup
  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto) {
    // Destructuring password from the DTO and hashing it for security
    const { password, ...rest } = createUserDto;
    const saltOrRounds = 10;
    const hashedPassword = await hash(password, saltOrRounds);
    // Creating a new user with hashed password
    return this.usersService.create({ ...rest, password: hashedPassword });
  }

  // POST request handler for user login
  @Post('/login')
  async login(@Body() dto: LoginDto) {
    // Validating user credentials using the AuthService
    const user = await this.authService.validateUser(dto.email, dto.password);
    // If user is not valid, throwing an UnauthorizedException
    if (!user) throw new UnauthorizedException('Invalid Credentials');
    // Generating a JWT token and returning it
    return this.authService.login(user);
  }

  // GET request handler for accessing login user details
  @Get('protected')
  @ApiBearerAuth() // Specifying that a bearer token is required for this endpoint
  @UseGuards(AuthGuard('jwt')) // Applying JWT authentication guard
  async get(@Req() req: any) {
    // Returning the authenticated user's information
    return req.user;
  }
}
