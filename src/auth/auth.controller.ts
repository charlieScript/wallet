import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from '../typeorm/entities/users.entity';

import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in-input.dto';
import { SignInResult } from './dto/sign-in-result.dto';
import { SignUpInput } from './dto/sign-up-input.dto';

@ApiTags('Admin Authentication Manager')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiResponse({
    status: 200,
    description: 'Login successfully',
  })
  @ApiOperation({ summary: 'signup' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  async signUp(@Body() input: SignUpInput): Promise<User> {
    const user = await this.authService.signUp(input);
    return user;
  }

  @ApiResponse({
    status: 200,
    description: 'Login successfully',
  })
  @ApiOperation({ summary: 'signup' })
  @Post('signin')
  async signIn(@Body() input: SignInInput): Promise<SignInResult> {
    return await this.authService.signIn(input);
  }
}
