import { registerUser, loginUser } from '../services/authService.js';
import { sendError, sendSuccess } from '../utils/response.js';

export const registerController = async (req, res) => {
  try {
    const result = await registerUser(req.body);
    return sendSuccess(res, result, 201);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

export const loginController = async (req, res) => {
  try {
    const result = await loginUser(req.body);
    return sendSuccess(res, result);
  } catch (error) {
    return sendError(res, error.message, 401);
  }
};
