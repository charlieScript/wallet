import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from '../typeorm/entities/accounts.entity';
import { Transactions } from '../typeorm/entities/transactions.entity';
import { User } from '../typeorm/entities/users.entity';
import { AccountService } from './accounts.service';

@Module({
  imports: [

    TypeOrmModule.forFeature([User, Accounts, Transactions]),
  ],
  providers: [AccountService]
})
export class AccountsModule { }
