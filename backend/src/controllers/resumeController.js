import multer from 'multer';
import { handleResumeUpload, parseResumeText } from '../services/resumeService.js';
import { rankResume, saveRanking } from '../services/rankingService.js';
import { sendError, sendSuccess } from '../utils/response.js';

const upload = multer({ dest: 'uploads/' });

export const uploadResume = async (req, res) => {
  try {
    const file = req.file;
    const candidate = await handleResumeUpload(file, req.body);
    const parsed = parseResumeText(`Candidate: ${candidate.full_name}\nRole: ${candidate.current_role}\nSkills: ${candidate.skills}`);
    const skillList = candidate.skills ? candidate.skills.split(',').map((s) => s.trim()).filter(Boolean) : [];
    const ranking = rankResume({ skills: skillList, experience: candidate.experience_years });

    await saveRanking(candidate.id, null, ranking.score, ranking.match, `Auto-ranked on upload. ${parsed.skills.length} keywords matched.`);

    return sendSuccess(res, { candidate, parsed, ranking }, 201);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

export const parseResume = (req, res) => {
  try {
    const parsed = parseResumeText(req.body.resumeText || '');
    return sendSuccess(res, parsed);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

export const uploadMiddleware = upload.single('resume');
