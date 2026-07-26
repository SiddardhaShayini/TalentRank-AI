import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiRequest } from '../utils/api';

function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await apiRequest(`/api/jobs/${id}`);
        setJob(data);
      } catch (err) {
        setError(err.message || 'Unable to load job');
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  if (loading) return <div className="card">Loading job...</div>;
  if (error) return <div className="card error">{error}</div>;
  if (!job) return <div className="card">Job not found.</div>;

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Position overview</p>
          <h2>{job.title}</h2>
        </div>
        <div className="row">
          <Link to={`/jobs/${job.id}/edit`} className="secondary-btn">Edit job</Link>
          <Link to="/ranking-results" className="primary-btn">View AI results</Link>
        </div>
      </section>

      <div className="grid grid-2">
        <div className="card">
          <h3>Role summary</h3>
          <p className="label">{job.description}</p>
          <div className="row" style={{ marginTop: 12 }}>
            <span className="pill info">{job.department}</span>
            <span className="pill">{job.location}</span>
            <span className="pill warning">{job.priority} priority</span>
          </div>
        </div>
        <div className="card">
          <h3>Pipeline insights</h3>
          <div className="metric-card" style={{ marginBottom: 10 }}>
            <div className="label">Employment type</div>
            <div className="value">{job.employment_type || job.type}</div>
          </div>
          <div className="metric-card">
            <div className="label">Current status</div>
            <div className="value">{job.status}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailsPage;
