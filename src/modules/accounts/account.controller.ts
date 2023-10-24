import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Account, Customer } from '../../domain/models';
import { createAccount, findAccount } from './account.service';
import BalanceService from '../balances/balance.service';

const create = async (req: Request, res: Response) => {
  try {
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

    const exists:Account|null = await findAccount(accountNumber);

    if (exists) {
      res.status(400).json({ message: 'Account exists, unable to crate.' });
      return;
    }

    const created = await createAccount(account);
    res.status(201).json(created);
  } catch (error) {
    console.log(error);
    res.status(500).json({});
  }
};

const getBalance = async (req:Request, res:Response) => {
  try {
    const accountId = req.params.id;
    const balanceService = new BalanceService();
    const total = await balanceService.getBalance(accountId);
    res.status(200).json({ total });
  } catch (error) {
    console.log(error);
    res.status(500).json({});
  }
};

export default {
  create,
  getBalance,
};
