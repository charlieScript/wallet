import { TXN_PURPOSE, TXN_TYPE } from "src/typeorm/entities/enums";

export interface ICredit_TX {
  amount: number,
  purpose: TXN_PURPOSE,
  metadata: any;
}

export interface ITX_RESPONSE {
  success: boolean;
  error?: string;
  message?: string;
}

