import { allQuery, getQuery, runQuery } from '../db/queries.js';

export const getAllCandidates = async () => allQuery('SELECT * FROM candidates ORDER BY created_at DESC');

export const getCandidateById = async (id) => getQuery('SELECT * FROM candidates WHERE id = ?', [id]);

export const createCandidate = async (payload) => {
  const result = await runQuery(
    'INSERT INTO candidates (full_name, email, phone, location, experience_years, current_role, skills, source, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [payload.full_name || payload.name, payload.email, payload.phone || '', payload.location || '', payload.experience_years || payload.experience || 0, payload.current_role || payload.role || '', payload.skills || '', payload.source || 'upload', payload.status || 'new']
  );
  return getCandidateById(result.lastID);
};

export const updateCandidate = async (id, payload) => {
  const fields = [];
  const values = [];
  if (payload.full_name !== undefined) { fields.push('full_name = ?'); values.push(payload.full_name); }
  if (payload.email !== undefined) { fields.push('email = ?'); values.push(payload.email); }
  if (payload.phone !== undefined) { fields.push('phone = ?'); values.push(payload.phone); }
  if (payload.location !== undefined) { fields.push('location = ?'); values.push(payload.location); }
  if (payload.experience_years !== undefined) { fields.push('experience_years = ?'); values.push(payload.experience_years); }
  if (payload.current_role !== undefined) { fields.push('current_role = ?'); values.push(payload.current_role); }
  if (payload.skills !== undefined) { fields.push('skills = ?'); values.push(payload.skills); }
  if (payload.source !== undefined) { fields.push('source = ?'); values.push(payload.source); }
  if (payload.status !== undefined) { fields.push('status = ?'); values.push(payload.status); }
  if (fields.length === 0) return getCandidateById(id);
  values.push(id);
  await runQuery(`UPDATE candidates SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, values);
  return getCandidateById(id);
};

export const deleteCandidate = async (id) => {
  const result = await runQuery('DELETE FROM candidates WHERE id = ?', [id]);
  return result.changes > 0;
};
