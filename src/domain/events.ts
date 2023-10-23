import {
  Transaction,
  Account,
} from './models';

type UUID = string;

interface AccountCreatedEvent {
    account: Account;
    id: UUID;
}

interface WithdrawCompleteEvent {
    transaction:Transaction;
    id: UUID;
}

interface DepositCompleteEvent {
    transaction:Transaction;
    id: UUID;
}
interface Event{
  id:number,
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
