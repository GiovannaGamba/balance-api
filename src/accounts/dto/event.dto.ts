import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateIf,
} from 'class-validator';

export class EventDto {
  @IsString()
  @IsIn(['deposit', 'withdraw', 'transfer'])
  type: 'deposit' | 'withdraw' | 'transfer';

  @ValidateIf((event: EventDto) => event.type !== 'deposit')
  @IsString()
  @IsNotEmpty()
  origin?: string;

  @ValidateIf((event: EventDto) => event.type !== 'withdraw')
  @IsString()
  @IsNotEmpty()
  destination?: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}

