import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../utils/api';

function JobsListPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await apiRequest('/api/jobs');
        setJobs(data);
      } catch (err) {
        setError(err.message || 'Unable to load jobs');
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Hiring pipeline</p>
          <h2>Jobs</h2>
        </div>
        <Link to="/jobs/create" className="primary-btn">Create job</Link>
      </section>

      <div className="card">
        {loading ? <p>Loading jobs...</p> : error ? <p className="error">{error}</p> : jobs.length === 0 ? <p className="label">No jobs created yet.</p> : (
          <table className="table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Department</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>
                    <Link to={`/jobs/${job.id}`}><strong>{job.title}</strong></Link>
                    <div className="label">{job.location}</div>
                  </td>
                  <td>{job.department}</td>
                  <td><span className={`pill ${job.priority === 'High' ? 'warning' : 'info'}`}>{job.priority}</span></td>
                  <td>{job.status}</td>
                  <td>
                    <div className="row">
                      <Link to={`/jobs/${job.id}/edit`} className="secondary-btn">Edit</Link>
                      <Link to={`/jobs/${job.id}`} className="ghost-btn">Open</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default JobsListPage;
