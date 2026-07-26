import express from 'express';
import { analyticsController, notificationsController, rankingController } from '../controllers/analyticsController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/analytics', authenticate, analyticsController);
router.get('/notifications', authenticate, notificationsController);
router.get('/ranking', authenticate, rankingController);

export default router;
