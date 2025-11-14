import { AccountEntity } from './account.entity';

export type BalanceResponse = number;

export interface DepositResponse {
  destination: AccountEntity;
}

export interface WithdrawResponse {
  origin: AccountEntity;
}

export interface TransferResponse {
  origin: AccountEntity;
  destination: AccountEntity;
}