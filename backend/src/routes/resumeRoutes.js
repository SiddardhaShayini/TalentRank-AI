import express from 'express';
import { parseResume, uploadMiddleware, uploadResume } from '../controllers/resumeController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/upload', authenticate, uploadMiddleware, uploadResume);
router.post('/parse', authenticate, parseResume);

export default router;
