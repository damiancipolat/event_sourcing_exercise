import { Router } from 'express';
import { transactionController } from './transaction.controller';
import validate from './transaction.guard';
import validateDeposit from './transaction.middleware';

const router: Router = Router();

router.post('/', validate, validateDeposit, transactionController);

export = router;
