import { AccountEntity } from './account.entity';

export interface AccountsRepository {
  findById(id: string): AccountEntity | undefined;
  save(account: AccountEntity): void;
  deleteAll(): void;
}

export class InMemoryAccountsRepository implements AccountsRepository {
    private readonly accounts = new Map<string, AccountEntity>();
  
    findById(id: string): AccountEntity | undefined {
      const account = this.accounts.get(id);
      return account ? { ...account } : undefined;
    }
  
    save(account: AccountEntity): void {
      this.accounts.set(account.id, { ...account });
    }
  
    deleteAll(): void {
      this.accounts.clear();
    }
  }