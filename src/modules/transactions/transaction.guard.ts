import { Request, Response, NextFunction } from 'express';
import transactionSchema from './schema';

const validateDeposit = (req: Request, res: Response, next:NextFunction):void => {
  const { error } = transactionSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: 'error in schema' });
    return;
  }

  next();
};

export default validateDeposit;
