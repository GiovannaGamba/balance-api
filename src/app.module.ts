import { Module } from '@nestjs/common';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsService } from './accounts/application/accounts.service';
import { ACCOUNTS_REPOSITORY, InMemoryAccountsRepository } from './accounts/domain/account.repository';

@Module({
  controllers: [AccountsController],
  providers: [
    AccountsService,
    {
      provide: ACCOUNTS_REPOSITORY,
      useClass: InMemoryAccountsRepository,
    },
  ],
})
export class AppModule {}
