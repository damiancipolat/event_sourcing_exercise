import e, { Request, Response } from 'express';
import { Transaction } from '../../domain/models';
import ledgerService from './ledger.service';

const depositController = async (req: Request, res: Response) => {
  try {
    const {
      ammount,
      accountId,
    } = req.body;

    const operation:Transaction = {
      type: 'deposit',
      ammount,
      accountId,
    };

    const created = await ledgerService.executeDeposit(operation);
    res.status(200).json(created);
  } catch (error:any) {
    res.status(500).json({ error: error?.message || 'internal error' });
  }
};

const withdrawController = async (req: Request, res: Response) => {
  try {
    const {
      ammount,
      accountId,
    } = req.body;

    const operation:Transaction = {
      type: 'withdraw',
      ammount,
      accountId,
    };

    const created = await ledgerService.executeWithdraw(operation);
    res.status(200).json(created);
  } catch (error:any) {
    res.status(500).json({ error: error?.message || 'internal error' });
  }
};

const transactionController = async (req: Request, res: Response):Promise<void> => {
  const {
    type,
  } = req.body;

  const controller:any = {
    deposit: depositController,
    withdraw: withdrawController,
  };

  await controller[type](req, res);
};

export {
  transactionController,
  depositController,
  withdrawController,
};
