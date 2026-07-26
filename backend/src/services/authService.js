import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants.js';
import { getQuery, runQuery } from '../db/queries.js';

export const registerUser = async ({ name, email, company, password }) => {
  const existingUser = await getQuery('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await runQuery(
    'INSERT INTO users (name, email, company, password, role) VALUES (?, ?, ?, ?, ?)',
    [name, email.toLowerCase(), company, hashedPassword, 'recruiter']
  );

  const user = await getQuery('SELECT id, name, email, company, role FROM users WHERE id = ?', [result.lastID]);
  return {
    user,
    token: jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' }),
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await getQuery('SELECT id, name, email, company, role, password FROM users WHERE email = ?', [email.toLowerCase()]);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  return {
    user: { id: user.id, name: user.name, email: user.email, company: user.company, role: user.role },
    token: jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' }),
  };
};
