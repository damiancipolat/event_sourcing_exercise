import {
  Transaction,
  Account,
} from './models';

type UUID = string;

interface AccountCreated {
    account: Account;
    date: Date;
    id: UUID;
}

interface WithdrawComplete {
    transaction:Transaction;
    date: Date;
    id: UUID;
}

interface DepositComplete {
    transaction:Transaction;
    date: Date;
    id: UUID;
}

export {
  AccountCreated,
  WithdrawComplete,
  DepositComplete,
};
