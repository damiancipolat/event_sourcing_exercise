import { Request, Response } from 'express';
import { Account, Customer } from '../../domain/models';
import { createAccount } from './account.service';

const create = async (req: Request, res: Response) => {
  const {
    name,
    surname,
    email,
    accountId,
    accountNumber,
  } = req.body;

  const customer:Customer = {
    name,
    surname,
    email,
  };

  const account:Account = {
    accountId,
    accountNumber,
    customer,
  };

  const created = await createAccount(account);
  res.status(201).json(created);
};

export default create;
