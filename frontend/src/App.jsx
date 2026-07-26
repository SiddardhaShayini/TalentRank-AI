import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import JobsListPage from './pages/JobsListPage';
import CreateJobPage from './pages/CreateJobPage';
import EditJobPage from './pages/EditJobPage';
import JobDetailsPage from './pages/JobDetailsPage';
import CandidatesListPage from './pages/CandidatesListPage';
import CandidateDetailsPage from './pages/CandidateDetailsPage';
import ResumeUploadPage from './pages/ResumeUploadPage';
import RankingResultsPage from './pages/RankingResultsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/jobs" element={<JobsListPage />} />
            <Route path="/jobs/create" element={<CreateJobPage />} />
            <Route path="/jobs/:id/edit" element={<EditJobPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/candidates" element={<CandidatesListPage />} />
            <Route path="/candidates/:id" element={<CandidateDetailsPage />} />
            <Route path="/resume-upload" element={<ResumeUploadPage />} />
            <Route path="/ranking-results" element={<RankingResultsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </>
  );
}

export default App;
