interface Customer {
    name: string;
    surname: string;
    email: string;
}

interface Account {
    accountId: string;
    accountNumber: string;
    customer: Customer;
}

interface Transaction {
    type: 'deposit' | 'withdraw';
    ammount: number;
    accountId: string;
}

export {
  Customer,
  Transaction,
  Account,
};
