export type DepositEvent = { type: 'deposit'; destination: string; amount: number };
export type WithdrawEvent = { type: 'withdraw'; origin: string; amount: number };
export type TransferEvent = { type: 'transfer'; origin: string; destination: string; amount: number };
export type EventPayload = DepositEvent | WithdrawEvent | TransferEvent;