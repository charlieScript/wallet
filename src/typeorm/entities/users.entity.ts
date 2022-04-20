import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Accounts } from './accounts.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: number;

  @Index({ unique: true })
  @Column()
  name: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Exclude({ toPlainOnly: true })
  @Column()
  password: string;

  @OneToOne(() => Accounts, (ac) => ac.user)
  account: Accounts;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @VersionColumn()
  readonly version: number;

}
