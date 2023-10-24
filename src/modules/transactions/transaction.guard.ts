import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const DEPOSIT_LIMIT = 10000;

const validateDeposit = (req: Request, res: Response, next:NextFunction):void => {
  const {
    type,
    ammount,
    accountId,
  } = req.body;

  if (type === 'deposit' && ammount >= DEPOSIT_LIMIT) {
    logger.info({ accountId, ammount }, 'Deposit over warning value');
  }

  next();
};

export default validateDeposit;
