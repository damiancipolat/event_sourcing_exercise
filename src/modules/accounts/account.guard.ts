import { Request, Response, NextFunction } from 'express';
import accountSchema from './schema';

const validate = (req: Request, res: Response, next:NextFunction):void => {
  const { error } = accountSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: 'error in schema' });
    return;
  }

  next();
};

export default validate;
