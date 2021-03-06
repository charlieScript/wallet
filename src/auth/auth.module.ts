import { Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountsModule } from '../accounts/accounts.module';
import { AccountService } from '../accounts/accounts.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { Accounts } from '../typeorm/entities/accounts.entity';
import { Transactions } from '../typeorm/entities/transactions.entity';
import { User } from '../typeorm/entities/users.entity';
import { UsersModule } from '../users/users.module';

import { AuthOptionsService } from './auth-options.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { MockStrategy } from './mock.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => ({
        // "jsonwebtoken" option to sign
        secret: config.env.JWT_SECRET,
        signOptions: {
          expiresIn: config.env.JWT_EXPIRES_IN,
        },
      }),
    }),
    PassportModule.registerAsync({
      imports: [ConfigModule],
      useClass: AuthOptionsService,
    }),
    TypeOrmModule.forFeature([User, Accounts, Transactions]),
    UsersModule,
    ConfigModule,
    AccountsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, MockStrategy, AccountService],
  exports: [AuthService],
})
export class AuthModule {}
