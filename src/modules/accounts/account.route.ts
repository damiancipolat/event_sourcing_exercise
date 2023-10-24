import { Router } from 'express';
import accountController from './account.controller';
import validate from './account.guard';

const router: Router = Router();

router.post('/', validate, accountController.create);
router.get('/:id/balance', accountController.getBalance);

export = router;
