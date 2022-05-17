import { Test, TestingModule } from '@nestjs/testing';
import { Accounts } from 'src/typeorm/entities/accounts.entity';
import { Repository } from 'typeorm';
import { AccountService } from './accounts.service';

describe('AccountsService', () => {
  let service: AccountService;
  let accountRepo: Repository<Accounts>

  beforeEach(async () => {
    const creditAccountMockValue = {
      creditAccount: () => 'mock'
    }

    const creditAccountMock = {
      provide: AccountService,
      useValue: creditAccountMockValue,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('credit account with 500', () => {
    it('credit', async () => {
      
    })
  })
});
