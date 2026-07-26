# TalentRank AI

AI-powered resume ranking platform for modern recruiting teams. Upload resumes, rank candidates automatically, manage job openings, and track your hiring pipeline — all backed by a live SQLite database.

---

## How the application works

### Architecture

```
Browser → Frontend (Vite/React, port 5000)
              │
              │  /api/* (Vite proxy)
              ▼
         Backend (Express/Node.js, port 3001)
              │
              ▼
         SQLite database (backend/talentrank.db)
```

The frontend runs on port 5000. Every `/api/...` request is transparently proxied by Vite to the Express backend on port 3001, so there are no CORS issues and no hard-coded URLs in the browser.

---

## Features

| Feature | How it works |
|---|---|
| **Login / Register** | JWT auth. Token stored in localStorage. Sent on every API call via `Authorization: Bearer`. |
| **Dashboard** | Fetches live counts from `/api/analytics` and recent jobs/candidates from the DB. |
| **Jobs** | Full CRUD via `/api/jobs`. Create, edit, delete, view details. |
| **Candidates** | Listed from `/api/candidates`. Clicking a row opens the full profile. |
| **Resume Upload** | `POST /api/resume/upload` (multipart). Creates a candidate record, saves the file, runs AI scoring, persists the score to `ai_scores`, and redirects to the candidate's profile. |
| **AI Ranking** | `/api/ranking` returns all candidates joined with their latest `ai_scores` row, sorted by score descending. Displays score %, match level, and summary. |
| **Analytics** | `/api/analytics` aggregates job count, candidate count, and average AI score from the database. |
| **Notifications** | Fetched from `/api/notifications` filtered by the logged-in user's ID. |
| **Logout** | Clears the localStorage session and redirects to `/login`. |

---

## Seeded demo account

| Field | Value |
|---|---|
| Email | `maya@talentrank.ai` |
| Password | `password123` |

---

## Running locally (Replit)

Two workflows start automatically:

| Workflow | Command | Port |
|---|---|---|
| **Start application** | `cd frontend && npm run dev` | 5000 (webview) |
| **Backend API** | `cd backend && PORT=3001 node src/server.js` | 3001 (console) |

The SQLite database file is created automatically at `backend/talentrank.db` and seeded with demo data on first launch.

---

## Project structure

```
backend/
  src/
    config/       # Constants (PORT, JWT_SECRET)
    controllers/  # HTTP handlers
    db/           # SQLite connection, schema, query helpers
    middleware/   # JWT auth middleware
    routes/       # Express route definitions
    services/     # Business logic (auth, jobs, candidates, resume, ranking, analytics)
    utils/        # Response helpers
  talentrank.db   # SQLite database (auto-created)
  uploads/        # Uploaded resume files

frontend/
  src/
    components/   # Layout, ProtectedRoute
    pages/        # All application pages
    utils/api.js  # Fetch wrapper with auth token injection
  vite.config.js  # Proxy config: /api → localhost:3001
```

---

## AI scoring algorithm

When a resume is uploaded, the ranking service computes a score (0–99):

- **Base score**: 70 points
- **Skill bonus**: +3 per skill listed (max +20)
- **Experience bonus**: +7 if experience > 5 years
- **Match level**: Excellent (≥90), Strong (≥80), Moderate (<80)

The score and match level are saved to the `ai_scores` table and shown on the Ranking Results page.
