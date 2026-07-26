# TalentRank AI

AI-powered resume ranking and recruiting pipeline platform.

## Stack

- **Frontend**: React 18 + Vite (port 5000, webview)
- **Backend**: Node.js + Express (port 3001, console workflow)
- **Database**: SQLite via `sqlite3` (`backend/talentrank.db`)
- **Auth**: JWT (stored in localStorage as `talentrank-auth`)

## Running the app

Two workflows run simultaneously:
- **Start application** — `cd frontend && npm run dev` → port 5000
- **Backend API** — `cd backend && PORT=3001 node src/server.js` → port 3001

The Vite dev server proxies all `/api/*` requests to `http://localhost:3001`, so the frontend uses relative URLs exclusively.

## Demo credentials

- Email: `maya@talentrank.ai`
- Password: `password123`

## Key conventions

- All frontend API calls use relative paths (e.g. `/api/jobs`) — no base URL. The Vite proxy handles routing to the backend.
- JWT secret comes from the `SESSION_SECRET` environment secret.
- The SQLite DB is auto-initialized and seeded on first backend start.
- Resume files are saved to `backend/uploads/`.

## User preferences

- Keep existing project structure (separate `backend/` and `frontend/` directories).
