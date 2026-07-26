import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants.js';
import { sendError } from '../utils/response.js';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return sendError(res, 'Authentication token missing', 401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return sendError(res, 'Invalid or expired token', 401);
  }
};
