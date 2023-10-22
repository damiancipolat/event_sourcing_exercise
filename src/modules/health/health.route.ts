import { Router } from 'express';
import health from './health.controller';

const router: Router = Router();

// Bind routes with controller.
router.get('/ready', health);
router.get('/live', health);
router.get('/', health);

export = router;
