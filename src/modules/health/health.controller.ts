import { Request, Response } from 'express';
import { getUsers } from '../test';

const health = async (req: Request, res: Response) => {
  const x = await getUsers();
  console.log('xxx', x);
  res.status(200).json({ health: 'OK' });
};

export default health;
