import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from 'src/typeorm/entities/accounts.entity';
import { Transactions } from 'src/typeorm/entities/transactions.entity';
import { User } from 'src/typeorm/entities/users.entity';
import { AccountService } from './accounts.service';

@Module({
  imports: [

    TypeOrmModule.forFeature([User, Accounts, Transactions]),
  ],
  providers: [AccountService]
})
export class AccountsModule { }
