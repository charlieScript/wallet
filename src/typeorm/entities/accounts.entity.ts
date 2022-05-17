import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

import { Card_TX } from './card.entity';
import { Transactions } from './transactions.entity';
import { User } from './users.entity';

@Entity('accounts')
export class Accounts {
  @PrimaryGeneratedColumn('uuid')
  readonly id: number;

  @Column({ default: 0, type: 'decimal', precision: 30, scale: 4 })
  balance: number;

  @OneToOne(() => User, (ac) => ac.account)
  @JoinColumn()
  user: User;

  @OneToMany(() => Transactions, (tx) => tx.account)
  transactions: Transactions;

  @OneToMany(() => Card_TX, (tx) => tx.account)
  tx_card: Card_TX;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @VersionColumn()
  readonly version: number;
}
