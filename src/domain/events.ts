import {
  Transaction,
  Account,
} from './models';

type UUID = string;

interface AccountCreatedEvent {
    account: Account;
    date: string;
    id: UUID;
}

interface WithdrawCompleteEvent {
    transaction:Transaction;
    date: string;
    id: UUID;
}

interface DepositCompleteEvent {
    transaction:Transaction;
    date: string;
    id: UUID;
}
interface Event{
  id:string,
  type:string;
  version:string;
  payload:string;
  created:string;
}

export {
  Event,
  AccountCreatedEvent,
  WithdrawCompleteEvent,
  DepositCompleteEvent,
};
