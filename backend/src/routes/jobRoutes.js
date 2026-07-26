import express from 'express';
import { createJobHandler, deleteJobHandler, getJob, listJobs, updateJobHandler } from '../controllers/jobController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, listJobs);
router.get('/:id', authenticate, getJob);
router.post('/', authenticate, createJobHandler);
router.put('/:id', authenticate, updateJobHandler);
router.delete('/:id', authenticate, deleteJobHandler);

export default router;
