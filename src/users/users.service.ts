import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../typeorm/entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findAll(): Promise<any[]> {
    const users = await this.usersRepo.find({ relations: ['account'] });
    return users.map((user) => {
      const { email, name, id, account } = user;
      return {
        id,
        email,
        name,
        balance: account.balance,
      };
    });
  }

  async findOneByName(email: string): Promise<any> {
    const user = await this.usersRepo.findOne(
      { email },
      { relations: ['account'] },
    );
    return user;
  }
}
