import { runQuery } from '../db/queries.js';

export const rankResume = (resumeData) => {
  const baseScore = 70;
  const skillBonus = Math.min(20, (resumeData.skills?.length || 0) * 3);
  const experienceBonus = Number(resumeData.experience) > 5 ? 7 : 0;
  const score = Math.min(99, baseScore + skillBonus + experienceBonus + 2);

  const match = score >= 90 ? 'Excellent' : score >= 80 ? 'Strong' : 'Moderate';
  return { score, match, suggestedStatus: score >= 90 ? 'Recommended' : score >= 80 ? 'Interview' : 'Screening' };
};

export const saveRanking = async (candidateId, jobId, score, matchLevel, summary) => {
  await runQuery('INSERT INTO ai_scores (candidate_id, job_id, score, match_level, summary) VALUES (?, ?, ?, ?, ?)', [candidateId, jobId, score, matchLevel, summary]);
};
