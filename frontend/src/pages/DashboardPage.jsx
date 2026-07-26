import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest, getCurrentUser } from '../utils/api';

function DashboardPage() {
  const [analytics, setAnalytics] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = getCurrentUser();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [analyticsData, jobsData, candidatesData] = await Promise.all([
          apiRequest('/api/analytics'),
          apiRequest('/api/jobs'),
          apiRequest('/api/candidates'),
        ]);
        setAnalytics(analyticsData);
        setJobs(jobsData.slice(0, 4));
        setCandidates(candidatesData.slice(0, 3));
      } catch (err) {
        setError(err.message || 'Unable to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div className="card">Loading dashboard...</div>;
  if (error) return <div className="card error">{error}</div>;

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Recruiting command center</p>
          <h2>Welcome back, {user?.name || 'Recruiter'}</h2>
        </div>
        <Link to="/jobs/create" className="primary-btn">Create job</Link>
      </section>

      <section className="metric-row">
        <div className="metric-card">
          <div className="label">Active jobs</div>
          <div className="value">{analytics?.totalJobs ?? 0}</div>
          <div className="label">Across your teams</div>
        </div>
        <div className="metric-card">
          <div className="label">Qualified candidates</div>
          <div className="value">{analytics?.activeCandidates ?? 0}</div>
          <div className="label">Ready for review</div>
        </div>
        <div className="metric-card">
          <div className="label">Ranking accuracy</div>
          <div className="value">{analytics?.rankingAccuracy ?? 0}%</div>
          <div className="label">Model confidence</div>
        </div>
        <div className="metric-card">
          <div className="label">Avg. time to hire</div>
          <div className="value">{analytics?.avgTimeToHire ?? 0} days</div>
          <div className="label">Down 18%</div>
        </div>
      </section>

      <section className="grid grid-2">
        <div className="card">
          <div className="page-header">
            <h3>Open positions</h3>
            <Link to="/jobs" className="secondary-btn">View all</Link>
          </div>
          {jobs.length === 0 ? <p className="label">No jobs yet. Create one to get started.</p> : jobs.map((job) => (
            <div key={job.id} className="list-card" style={{ marginBottom: 10 }}>
              <div>
                <strong>{job.title}</strong>
                <div className="label">{job.department} · {job.location}</div>
              </div>
              <span className="pill info">{job.status}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="page-header">
            <h3>Top candidates</h3>
            <Link to="/candidates" className="secondary-btn">View all</Link>
          </div>
          {candidates.length === 0 ? <p className="label">No candidates have been uploaded yet.</p> : candidates.map((candidate) => (
            <div key={candidate.id} className="list-card" style={{ marginBottom: 10 }}>
              <div className="row">
                <div className="avatar">{(candidate.full_name || candidate.name || '').split(' ').map((part) => part[0]).join('')}</div>
                <div>
                  <strong>{candidate.full_name || candidate.name}</strong>
                  <div className="label">{candidate.current_role || candidate.role}</div>
                </div>
              </div>
              <span className="pill success">{candidate.status}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
