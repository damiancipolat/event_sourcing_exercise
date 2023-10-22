import { Router } from 'express';
import notFound from './middleware/notFound';
// import errorHandler from './middleware/errorHandler';

import health from '../modules/health/health.route';

const router: Router = Router();
router.use('/health', health);

// router.use(errorHandler);
router.get('*', notFound);

export = router;
