import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountsModule } from './accounts/accounts.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TypeOrmOptionsService } from './typeorm/typeorm-options.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmOptionsService,
    }),
    AuthModule,
    AccountsModule,
    TransactionsModule,
  ],
  controllers: [AppController]
})
export class AppModule { }
