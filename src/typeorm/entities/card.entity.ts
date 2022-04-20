import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Accounts } from './accounts.entity';

@Entity('card_transactions')
export class Card_TX {
  @PrimaryGeneratedColumn('uuid')
  readonly id: number;

  @Column({ type: 'money', nullable: false })
  amount: number;

  @Column({ generated: 'uuid', unique: true })
  external_reference: string;

  @Column({})
  last_response: string;

  @ManyToOne(() => Accounts)
  account: Accounts;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @VersionColumn()
  readonly version: number;

}
