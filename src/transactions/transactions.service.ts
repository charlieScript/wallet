import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/accounts/accounts.service';
import { ITX_RESPONSE } from 'src/accounts/interfaces/accounts.interface';
import { Accounts } from 'src/typeorm/entities/accounts.entity';
import { Transactions } from 'src/typeorm/entities/transactions.entity';
import { User } from 'src/typeorm/entities/users.entity';
import { Connection, Repository } from 'typeorm';
import { ITX_SEND } from './interface/tx.inteface';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Accounts) private readonly accountRepo: Repository<Accounts>,
    @InjectRepository(Transactions) readonly txRepo: Repository<Transactions>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly accountService: AccountService,
    private connection: Connection
  ) { }

  async sendMoney(data: ITX_SEND, sender: string): Promise<ITX_RESPONSE> {
    const { amount, metadata, purpose, } = data;
    const Reciever = await this.userRepo.findOne({ where: { name: data.reciever } });
    if (!Reciever) {
      return {
        success: false,
        error: 'invalid reciever'
      };
    }

    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // debit user
      const debit = await this.accountService.debitAccount(sender, amount, metadata, purpose);

      if (debit.success) {
        const credit = await this.accountService.creditAccount(Reciever.name, amount, metadata, purpose);
        if (credit.success) {
          await queryRunner.commitTransaction();
          return {
            success: true,
            message: 'transfer successful'
          };
        }
        await queryRunner.rollbackTransaction();
      }
      await queryRunner.rollbackTransaction();
      return {
        success: false,
        message: debit.message,
        error: debit.error,
      };
    } catch (err) {
      // since we have errors lets rollback the changes we made
      console.log(err);
      await queryRunner.rollbackTransaction();
      return {
        success: false,
        error: 'an error occurred'
      };
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

  }
}
