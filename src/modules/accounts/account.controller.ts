import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Account, Customer } from '../../domain/models';
import { createAccount } from './account.service';

const create = async (req: Request, res: Response) => {
  const {
    name,
    surname,
    email,
    accountNumber,
  } = req.body;

  const customer:Customer = {
    name,
    surname,
    email,
  };

  const account:Account = {
    accountId: uuidv4(),
    accountNumber,
    customer,
  };

  const created = await createAccount(account);
  res.status(201).json(created);
};

export default create;
