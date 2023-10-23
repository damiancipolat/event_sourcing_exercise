import { Router } from 'express';
import { transactionController } from './transaction.controller';
import validate from './transaction.guard';

const router: Router = Router();

router.post('/transaction', validate, transactionController);

export = router;
