import { allQuery, getQuery, runQuery } from '../db/queries.js';

export const getAllJobs = async () => allQuery('SELECT * FROM jobs ORDER BY created_at DESC');

export const getJobById = async (id) => getQuery('SELECT * FROM jobs WHERE id = ?', [id]);

export const createJob = async (payload, userId) => {
  const result = await runQuery(
    'INSERT INTO jobs (title, department, location, employment_type, priority, description, status, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [payload.title, payload.department, payload.location, payload.type || payload.employment_type || 'Full-time', payload.priority || 'Medium', payload.description || '', payload.status || 'active', userId]
  );
  return getJobById(result.lastID);
};

export const updateJob = async (id, payload) => {
  const fields = [];
  const values = [];
  if (payload.title !== undefined) { fields.push('title = ?'); values.push(payload.title); }
  if (payload.department !== undefined) { fields.push('department = ?'); values.push(payload.department); }
  if (payload.location !== undefined) { fields.push('location = ?'); values.push(payload.location); }
  if (payload.type !== undefined) { fields.push('employment_type = ?'); values.push(payload.type); }
  if (payload.priority !== undefined) { fields.push('priority = ?'); values.push(payload.priority); }
  if (payload.description !== undefined) { fields.push('description = ?'); values.push(payload.description); }
  if (payload.status !== undefined) { fields.push('status = ?'); values.push(payload.status); }
  if (fields.length === 0) return getJobById(id);
  values.push(id);
  await runQuery(`UPDATE jobs SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, values);
  return getJobById(id);
};

export const deleteJob = async (id) => {
  const result = await runQuery('DELETE FROM jobs WHERE id = ?', [id]);
  return result.changes > 0;
};
