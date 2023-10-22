interface Customer {
    name: string;
    surname: string;
    email: string;
    idNumber: string;
}

interface Account {
    accountId: string;
    accountNumber: string;
    customer: Customer;
}

interface Transaction {
    type: 'deposit' | 'withdraw';
    amount: number;
    accountId: string;
}

export {
  Customer,
  Transaction,
  Account,
};
