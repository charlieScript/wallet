import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AccountService } from 'src/accounts/accounts.service';
import { Repository } from 'typeorm';

import { User } from '../typeorm/entities/users.entity';
import { UsersService } from '../users/users.service';

import { JwtPayload } from './dto/jwt-payload.dto';
import { SignInInput } from './dto/sign-in-input.dto';
import { SignUpInput } from './dto/sign-up-input.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
    private readonly usersService: UsersService,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) { }

  async signUp(input: SignUpInput): Promise<any> {
    if (await this.usersService.findOneByName(input.email))
      throw new ConflictException('Username already exists');

    const user = this.usersRepo.create(input);
    user.password = AuthService.encryptPassword(user.password);
    const result = await this.usersRepo.save(user);
    if (!result) {
      return new BadRequestException();
    }
    const account = await this.accountService.createAccount(result);
    return {
      email: result.email,
      name: result.name,
      balance: account.balance
    };
  }

  private static encryptPassword(password): string {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  async signIn(input: SignInInput): Promise<any> {
    const user = await this.usersService.findOneByName(input.email);
    if (!user) {
      return new NotFoundException('User not found');
    }

    const valid = await bcrypt.compare(input.password, user.password);
    if (!valid) {
      return new BadRequestException('invalid name/password');
    }

    const payload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);

    return {
      email: user.email,
      name: user.name,
      token,
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findOneByName(payload.email);
    return user;
  }
}
