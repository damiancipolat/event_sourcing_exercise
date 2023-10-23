import { Router } from 'express';
import { create, getBalance } from './account.controller';
import validate from './account.guard';

const router: Router = Router();

router.post('/', validate, create);
router.get('/:id/balance', getBalance);

export = router;
