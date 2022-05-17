import { randomUUID } from 'crypto';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOperator, Repository } from 'typeorm';

import { Accounts } from '../typeorm/entities/accounts.entity';
import { TXN_PURPOSE, TXN_TYPE } from '../typeorm/entities/enums';
import { Transactions } from '../typeorm/entities/transactions.entity';
import { User } from '../typeorm/entities/users.entity';

import { ICredit_TX, ITX_RESPONSE } from './interfaces/accounts.interface';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Accounts)
    private readonly accountRepo: Repository<Accounts>,
    @InjectRepository(Transactions)
    private readonly txRepo: Repository<Transactions>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async creditAccount(
    name: string,
    amount: number,
    metadata: any,
    purpose: TXN_PURPOSE,
  ): Promise<ITX_RESPONSE> {
    const { account } = await this.userRepo.findOne({
      where: { name },
      relations: ['account'],
    });

    if (!account) {
      return {
        success: false,
        message: 'Account does not exist',
      };
    }

    await this.accountRepo.update(
      { id: account.id },
      { balance: account.balance + amount },
    );

    const tx = this.txRepo.create({
      txn_type: TXN_TYPE.credit,
      txn_purpose: purpose,
      account,
      amount,
      metadata,
      balance_before: account.balance,
      balance_after: account.balance + amount,
    });

    await this.txRepo.save(tx);

    return {
      success: true,
      message: 'Credit Successfully',
    };
  }

  async debitAccount(
    name: string,
    amount: number,
    metadata: any,
    purpose: TXN_PURPOSE,
  ): Promise<ITX_RESPONSE> {
    const { account } = await this.userRepo.findOne({
      where: { name },
      relations: ['account'],
    });

    if (!account) {
      return {
        success: false,
        message: 'Account does not exist',
      };
    }

    if (account.balance < amount) {
      return {
        success: false,
        error: 'Insufficient balance',
      };
    }

    await this.accountRepo.update(
      { id: account.id },
      { balance: account.balance - amount },
    );

    const tx = this.txRepo.create({
      txn_type: TXN_TYPE.debit,
      txn_purpose: purpose,
      account,
      amount,
      metadata,
      balance_before: account.balance,
      balance_after: account.balance - amount,
    });

    await this.txRepo.save(tx);

    return {
      success: true,
      message: 'Dedit Successfully',
    };
  }

  async createAccount(user: User) {
    const account = this.accountRepo.create({
      balance: 5000,
      user,
    });
    await this.accountRepo.save(account);
    return account;
  }
}
