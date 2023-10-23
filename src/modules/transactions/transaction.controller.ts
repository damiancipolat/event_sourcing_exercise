import { Request, Response } from 'express';
import { Transaction } from '../../domain/models';
import {
  executeWithdraw,
  executeDeposit,
} from './ledger.service';

const depositController = async (req: Request, res: Response) => {
  const {
    ammount,
    accountId,
  } = req.body;

  const operation:Transaction = {
    type: 'deposit',
    ammount,
    accountId,
  };

  const created = await executeDeposit(operation);
  res.status(200).json(created);
};

const withdrawController = async (req: Request, res: Response) => {
  const {
    ammount,
    accountId,
  } = req.body;

  const operation:Transaction = {
    type: 'withdraw',
    ammount,
    accountId,
  };

  const created = await executeWithdraw(operation);
  res.status(200).json(created);
};

const transactionController = async (req: Request, res: Response):Promise<void> => {
  const {
    type,
  } = req.body;

  if (type === 'deposit') {
    await depositController(req, res);
    return;
  }

  if (type === 'withdraw') {
    await depositController(req, res);
    return;
  }

  res.status(400).json();
};

export {
  transactionController,
  depositController,
  withdrawController,
};
