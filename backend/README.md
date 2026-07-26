# TalentRank AI Backend

## Folder Structure
- src/config: environment and app constants
- src/controllers: HTTP request handlers
- src/services: business logic for auth, jobs, candidates, resume, ranking, analytics
- src/middleware: authentication middleware
- src/routes: API route definitions
- src/data: in-memory sample data store
- src/utils: response helpers

## API Overview
- Auth: POST /api/auth/register, POST /api/auth/login
- Jobs: GET /api/jobs, GET /api/jobs/:id, POST /api/jobs, PUT /api/jobs/:id, DELETE /api/jobs/:id
- Candidates: GET /api/candidates, GET /api/candidates/:id, POST /api/candidates, PUT /api/candidates/:id, DELETE /api/candidates/:id
- Resume: POST /api/resume/upload, POST /api/resume/parse
- Analytics: GET /api/analytics, GET /api/notifications

## Database design
- The SQLite database file is stored at backend/talentrank.db.
- The schema is defined in backend/src/db/schema.sql and initialized automatically by backend/src/db/database.js.
- Main tables: users, jobs, candidates, applications, uploaded_resumes, ai_scores, and notifications.
- Foreign keys are enabled and starter records are seeded on first launch.

## How to run backend
1. cd backend
2. npm install
3. node src/server.js
4. Open http://localhost:5000/health
5. Optional: inspect the database with sqlite3 or a SQLite client
