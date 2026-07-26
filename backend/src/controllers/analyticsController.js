import { getAnalytics, getNotifications, getRankingResults } from '../services/analyticsService.js';
import { sendError, sendSuccess } from '../utils/response.js';

export const analyticsController = async (req, res) => {
  try {
    const analytics = await getAnalytics();
    return sendSuccess(res, analytics);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const notificationsController = async (req, res) => {
  try {
    const notifications = await getNotifications(req.user.id);
    return sendSuccess(res, notifications);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

export const rankingController = async (req, res) => {
  try {
    const results = await getRankingResults();
    return sendSuccess(res, results);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};
