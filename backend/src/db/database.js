import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../../', 'talentrank.db');

const sqlite = sqlite3.verbose();

export const db = new sqlite.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to open database', err.message);
  } else {
    console.log(`SQLite database ready at ${dbPath}`);
  }
});

const schemaPath = path.join(__dirname, 'schema.sql');
const schema = fs.readFileSync(schemaPath, 'utf8');

export const initDatabase = () => new Promise((resolve, reject) => {
  db.exec(schema, (err) => {
    if (err) return reject(err);
    resolve();
  });
});

export const seedDatabase = () => new Promise((resolve, reject) => {
  const seedStatements = [
    `INSERT OR IGNORE INTO users (id, name, email, company, password, role) VALUES (1, 'Maya Chen', 'maya@talentrank.ai', 'TalentRank AI', '$2a$10$qBDmvK.I.wVavdwDIL2tc.ioQ0s2cpHwM.yJNvA5NO8K4T/CU2T/2', 'admin')`,
    `INSERT OR IGNORE INTO jobs (id, title, department, location, employment_type, priority, description, status, created_by) VALUES (1, 'Senior Product Designer', 'Design', 'Remote · US', 'Full-time', 'High', 'Lead product design for the B2B recruiting platform.', 'active', 1)`,
    `INSERT OR IGNORE INTO jobs (id, title, department, location, employment_type, priority, description, status, created_by) VALUES (2, 'Staff Frontend Engineer', 'Engineering', 'New York, NY', 'Full-time', 'Medium', 'Build modern interfaces for our AI hiring intelligence workflows.', 'active', 1)`,
    `INSERT OR IGNORE INTO candidates (id, full_name, email, phone, location, experience_years, current_role, skills, source, status) VALUES (1, 'Amara Chen', 'amara.chen@email.com', '+1-555-0101', 'Austin, TX', 8, 'Senior UX Designer', 'Figma,Design Systems,User Research', 'LinkedIn', 'recommended')`,
    `INSERT OR IGNORE INTO candidates (id, full_name, email, phone, location, experience_years, current_role, skills, source, status) VALUES (2, 'Daniel Ortiz', 'daniel.ortiz@email.com', '+1-555-0102', 'Chicago, IL', 6, 'Frontend Engineer', 'React,TypeScript,Node.js', 'Indeed', 'interview')`,
    `INSERT OR IGNORE INTO applications (id, candidate_id, job_id, status) VALUES (1, 1, 1, 'screening')`,
    `INSERT OR IGNORE INTO applications (id, candidate_id, job_id, status) VALUES (2, 2, 2, 'interview')`,
    `INSERT OR IGNORE INTO ai_scores (id, candidate_id, job_id, score, match_level, summary) VALUES (1, 1, 1, 94.2, 'Excellent', 'Strong product design and research alignment')`,
    `INSERT OR IGNORE INTO ai_scores (id, candidate_id, job_id, score, match_level, summary) VALUES (2, 2, 2, 89.7, 'Strong', 'Strong engineering fit with modern frontend stack')`,
    `INSERT OR IGNORE INTO notifications (id, user_id, title, message) VALUES (1, 1, 'New application received', '5 new resumes matched Senior Product Designer')`,
    `INSERT OR IGNORE INTO notifications (id, user_id, title, message) VALUES (2, 1, 'Ranking threshold updated', 'Scoring model adjusted for product roles')`
  ];

  db.exec(seedStatements.join('; '), (err) => {
    if (err) return reject(err);
    resolve();
  });
});
