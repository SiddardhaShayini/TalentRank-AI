import { allQuery, getQuery } from '../db/queries.js';

export const getAnalytics = async () => {
  const [jobCount, candidateCount, avgScoreRow, interviewCount] = await Promise.all([
    getQuery('SELECT COUNT(*) AS count FROM jobs WHERE status = ?', ['active']),
    getQuery('SELECT COUNT(*) AS count FROM candidates'),
    getQuery('SELECT AVG(score) AS average_score FROM ai_scores'),
    getQuery("SELECT COUNT(*) AS count FROM candidates WHERE status IN ('interview', 'recommended')"),
  ]);

  return {
    totalJobs: jobCount?.count ?? 0,
    activeCandidates: candidateCount?.count ?? 0,
    rankingAccuracy: avgScoreRow?.average_score ? Math.round(avgScoreRow.average_score * 10) / 10 : 0,
    avgTimeToHire: 16,
    interviewReady: interviewCount?.count ?? 0,
  };
};

export const getNotifications = async (userId) =>
  allQuery(
    'SELECT id, title, message AS detail, created_at AS createdAt FROM notifications WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );

export const getRankingResults = async () =>
  allQuery(`
    SELECT c.id, c.full_name, c.email, c.current_role, c.location, c.experience_years,
           c.skills, c.status, c.source, c.created_at,
           s.score, s.match_level, s.summary
    FROM candidates c
    LEFT JOIN ai_scores s
      ON c.id = s.candidate_id
      AND s.id = (SELECT MAX(id) FROM ai_scores WHERE candidate_id = c.id)
    ORDER BY COALESCE(s.score, 0) DESC
  `);
