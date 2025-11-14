import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { AccountsService } from './application/accounts.service';
import { EventDto } from './dto/event.dto';

@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get('balance')
  async getBalance(
    @Query('account_id') accountId: string,
    @Res() res: Response,
  ): Promise<void> {
    const balance = this.accountsService.getBalance(accountId);

    if (balance === null) {
      res.status(HttpStatus.NOT_FOUND).send('0');
      return;
    }

    res.status(HttpStatus.OK).send(balance.toString());
  }

  @Post('event')
  async handleEvent(
    @Body() eventDto: EventDto,
    @Res() res: Response,
  ): Promise<void> {
    if (eventDto.type === 'deposit') {
      const response = this.accountsService.deposit(eventDto.destination!, eventDto.amount);
      res.status(HttpStatus.CREATED).json(response);
      return;
    }

    if (eventDto.type === 'withdraw') {
      const response = this.accountsService.withdraw(eventDto.origin!, eventDto.amount);
      if (!response) {
        res.status(HttpStatus.NOT_FOUND).send('0');
        return;
      }
      res.status(HttpStatus.CREATED).json(response);
      return;
    }

    const response = this.accountsService.transfer(eventDto.origin!, eventDto.destination!, eventDto.amount);

    if (!response) {
      res.status(HttpStatus.NOT_FOUND).send('0');
      return;
    }

    res.status(HttpStatus.CREATED).json(response);
  }

  @Post('reset')
  async reset(@Res() res: Response): Promise<void> {
    this.accountsService.reset();
    res.status(HttpStatus.OK).send('OK');
  }
}

