import { createJob, deleteJob, getAllJobs, getJobById, updateJob } from '../services/jobService.js';
import { sendError, sendSuccess } from '../utils/response.js';

export const listJobs = async (req, res) => {
  try {
    const jobs = await getAllJobs();
    return sendSuccess(res, jobs);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await getJobById(req.params.id);
    if (!job) return sendError(res, 'Job not found', 404);
    return sendSuccess(res, job);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const createJobHandler = async (req, res) => {
  try {
    const job = await createJob(req.body, req.user.id);
    return sendSuccess(res, job, 201);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

export const updateJobHandler = async (req, res) => {
  try {
    const job = await updateJob(req.params.id, req.body);
    if (!job) return sendError(res, 'Job not found', 404);
    return sendSuccess(res, job);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

export const deleteJobHandler = async (req, res) => {
  try {
    const deleted = await deleteJob(req.params.id);
    if (!deleted) return sendError(res, 'Job not found', 404);
    return sendSuccess(res, { deleted: true });
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};
