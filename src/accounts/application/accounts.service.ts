import { Inject, Injectable } from '@nestjs/common';
import { ACCOUNTS_REPOSITORY } from '../domain/account.repository';
import type { AccountsRepository } from '../domain/account.repository';
import type { AccountEntity } from '../domain/account.entity';
import type {
  BalanceResponse,
  DepositResponse,
  TransferResponse,
  WithdrawResponse,
} from '../domain/balance.response';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(ACCOUNTS_REPOSITORY)
    private readonly accountsRepository: AccountsRepository,
  ) {}

  getBalance(accountId: string): BalanceResponse | null {
    const account = this.accountsRepository.findById(accountId);
    return account ? account.balance : null;
  }

  deposit(destination: string, amount: number): DepositResponse {
    const account = this.accountsRepository.findById(destination) ?? {
      id: destination,
      balance: 0,
    };

    const updatedAccount = this.buildAccount(account, account.balance + amount);
    this.accountsRepository.save(updatedAccount);

    return {
      destination: updatedAccount,
    };
  }

  withdraw(origin: string, amount: number): WithdrawResponse | null {
    const account = this.accountsRepository.findById(origin);

    if (!account) {
      return null;
    }

    const updatedAccount = this.buildAccount(account, account.balance - amount);
    this.accountsRepository.save(updatedAccount);

    return {
      origin: updatedAccount,
    };
  }

  transfer(
    origin: string,
    destination: string,
    amount: number,
  ): TransferResponse | null {
    const originAccount = this.accountsRepository.findById(origin);
    if (!originAccount) {
      return null;
    }

    const destinationAccount = this.accountsRepository.findById(destination) ?? {
      id: destination,
      balance: 0,
    };

    const updatedOrigin = this.buildAccount(originAccount, originAccount.balance - amount);
    const updatedDestination = this.buildAccount(
      destinationAccount,
      destinationAccount.balance + amount,
    );

    this.accountsRepository.save(updatedOrigin);
    this.accountsRepository.save(updatedDestination);

    return {
      origin: updatedOrigin,
      destination: updatedDestination,
    };
  }

  reset(): void {
    this.accountsRepository.deleteAll();
  }

  private buildAccount(account: AccountEntity, balance: number): AccountEntity {
    return {
      ...account,
      balance,
    };
  }
}

