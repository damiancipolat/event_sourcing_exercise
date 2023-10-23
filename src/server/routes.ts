import { Router } from 'express';
import notFound from './middleware/notFound';

import health from '../modules/health/health.route';
import account from '../modules/accounts/account.route';
import transactions from '../modules/transactions/transaction.route';

const router: Router = Router();
router.use('/health', health);
router.use('/accounts', account);
router.use('/transactions', transactions);

router.get('*', notFound);

export = router;
