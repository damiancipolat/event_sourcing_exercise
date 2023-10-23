import { Router } from 'express';
import accountController from './account.controller';
import validate from './account.guard';

const router: Router = Router();

router.post('/', validate, accountController);

export = router;
