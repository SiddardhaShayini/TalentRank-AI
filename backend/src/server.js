import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import { PORT } from './config/constants.js';
import { initDatabase, seedDatabase } from './db/database.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ success: true, message: 'TalentRank AI backend is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api', analyticsRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ success: false, error: 'Internal server error' });
});

async function startServer() {
  try {
    await initDatabase();
    await seedDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize database', error);
    process.exit(1);
  }
}

startServer();
