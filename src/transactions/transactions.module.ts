import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from 'src/accounts/accounts.service';
import { Accounts } from 'src/typeorm/entities/accounts.entity';
import { Transactions } from 'src/typeorm/entities/transactions.entity';
import { User } from 'src/typeorm/entities/users.entity';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';

@Module({
  providers: [TransactionsService, AccountService],
  imports: [TypeOrmModule.forFeature([Accounts, User, Transactions])],
  controllers: [TransactionsController]
})
export class TransactionsModule { }
