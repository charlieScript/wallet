import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountService } from '../accounts/accounts.service';
import { Accounts } from '../typeorm/entities/accounts.entity';
import { Transactions } from '../typeorm/entities/transactions.entity';
import { User } from '../typeorm/entities/users.entity';

import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  providers: [TransactionsService, AccountService],
  imports: [TypeOrmModule.forFeature([Accounts, User, Transactions])],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
