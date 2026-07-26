import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { UPLOAD_DIR } from '../config/constants.js';
import { runQuery, getQuery } from '../db/queries.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadRoot = path.join(__dirname, '../../', UPLOAD_DIR);

if (!fs.existsSync(uploadRoot)) {
  fs.mkdirSync(uploadRoot, { recursive: true });
}

export const handleResumeUpload = async (file, payload) => {
  if (!file) {
    throw new Error('Resume file is required');
  }

  const experienceYears = parseInt(payload.experience || payload.experience_years || 0, 10);
  const parsedText = `Candidate: ${payload.name || 'Unknown'}\nRole: ${payload.role || 'Unknown'}\nSkills: ${payload.skills || 'General'}\nExperience: ${experienceYears} years`;

  const storedName = `${Date.now()}_${path.basename(file.originalname)}`;
  const resumePath = path.join(uploadRoot, storedName);
  fs.renameSync(file.path, resumePath);

  const candidateResult = await runQuery(
    'INSERT INTO candidates (full_name, email, phone, location, experience_years, current_role, skills, source, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      payload.name,
      payload.email,
      payload.phone || '',
      payload.location || 'Remote',
      experienceYears,
      payload.role || '',
      payload.skills || '',
      payload.source || 'upload',
      'new',
    ]
  );

  await runQuery(
    'INSERT INTO uploaded_resumes (candidate_id, original_name, stored_name, file_path, mime_type, parsed_text) VALUES (?, ?, ?, ?, ?, ?)',
    [candidateResult.lastID, file.originalname, storedName, resumePath, file.mimetype || 'application/octet-stream', parsedText]
  );

  return getQuery('SELECT * FROM candidates WHERE id = ?', [candidateResult.lastID]);
};

export const parseResumeText = (resumeText) => {
  const skillMatches = ['React', 'TypeScript', 'Python', 'Design', 'Leadership', 'Node.js', 'Figma'];
  const matchedSkills = skillMatches.filter((skill) => resumeText.toLowerCase().includes(skill.toLowerCase()));
  return {
    extractedText: resumeText,
    skills: matchedSkills,
    confidence: matchedSkills.length > 3 ? 0.93 : 0.81,
  };
};
