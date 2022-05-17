import { ICredit_TX } from 'src/accounts/interfaces/accounts.interface';

export interface ITX_SEND extends ICredit_TX {
  amount: number;
  reciever: string;
}
