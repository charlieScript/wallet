import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Accounts } from './accounts.entity';
import { TXN_PURPOSE, TXN_TYPE } from './enums';
import { User } from './users.entity';

@Entity('transactions')
export class Transactions {
  @PrimaryGeneratedColumn('uuid')
  readonly id: number;

  @Column({})
  txn_type: TXN_TYPE;

  @Column({})
  txn_purpose: TXN_PURPOSE;

  @Column({ type: 'money', nullable: false })
  amount: number;

  @Column({ generated: 'uuid', unique: true })
  reference: string;

  @Column({ type: 'money', nullable: false })
  balance_before: number;

  @Column({ type: 'money', nullable: false })
  balance_after: number;

  @Column({ type: 'json' })
  metadata: JSON;

  @ManyToOne(() => Accounts)
  account: Accounts;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @VersionColumn()
  readonly version: number;

}
