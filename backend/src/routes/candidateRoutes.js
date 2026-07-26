import express from 'express';
import { createCandidateHandler, deleteCandidateHandler, getCandidate, listCandidates, updateCandidateHandler } from '../controllers/candidateController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, listCandidates);
router.get('/:id', authenticate, getCandidate);
router.post('/', authenticate, createCandidateHandler);
router.put('/:id', authenticate, updateCandidateHandler);
router.delete('/:id', authenticate, deleteCandidateHandler);

export default router;
