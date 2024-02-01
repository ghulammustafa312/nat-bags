import { Injectable, NotAcceptableException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './user.service';

@Injectable()
export class AuthService {
  // Constructor that injects the UsersService and JwtService
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Method to validate user credentials during login
  async validateUser(email: string, password: string): Promise<any> {
    // Fetching the user by email
    const user = await this.usersService.findByEmail(email);

    // If user not found, returning null
    if (!user) return null;

    // Comparing the provided password with the hashed password in the user object
    const passwordValid = await bcrypt.compare(password, user.password);

    // If user not found, throwing a custom exception
    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }

    // If user and password are valid, returning the user
    if (user && passwordValid) {
      return user;
    }

    // If credentials are not valid, returning null
    return null;
  }

  // Method to generate a JWT token upon successful login
  async login(user: any) {
    // Creating a JWT payload with user details
    const payload = { username: user.email, sub: user._id };

    // Removing the password from the user object before returning
    delete user['_doc']['password'];

    // Generating an access token and returning it along with the user details
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
