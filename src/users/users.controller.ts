import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBasicAuth, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

import { User } from '../typeorm/entities/users.entity';

import { UsersService } from './users.service';

@ApiTags('User Management')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(@Request() req): Promise<User[]> {
    const users = await this.usersService.findAll();
    return users;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':name')
  async findOneByName(
    @Param('name') name: string,
  ): Promise<any | NotFoundException> {
    const user = await this.usersService.findOneByName(name);
    if (!user) {
      return new NotFoundException();
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      balance: user.account.balance,
    };
  }
}
