import { createCandidate, deleteCandidate, getAllCandidates, getCandidateById, updateCandidate } from '../services/candidateService.js';
import { sendError, sendSuccess } from '../utils/response.js';

export const listCandidates = async (req, res) => {
  try {
    const candidates = await getAllCandidates();
    return sendSuccess(res, candidates);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const getCandidate = async (req, res) => {
  try {
    const candidate = await getCandidateById(req.params.id);
    if (!candidate) return sendError(res, 'Candidate not found', 404);
    return sendSuccess(res, candidate);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const createCandidateHandler = async (req, res) => {
  try {
    const candidate = await createCandidate(req.body);
    return sendSuccess(res, candidate, 201);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

export const updateCandidateHandler = async (req, res) => {
  try {
    const candidate = await updateCandidate(req.params.id, req.body);
    if (!candidate) return sendError(res, 'Candidate not found', 404);
    return sendSuccess(res, candidate);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

export const deleteCandidateHandler = async (req, res) => {
  try {
    const deleted = await deleteCandidate(req.params.id);
    if (!deleted) return sendError(res, 'Candidate not found', 404);
    return sendSuccess(res, { deleted: true });
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};
