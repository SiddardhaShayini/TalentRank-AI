import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../utils/api';

function CandidatesListPage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCandidates = async () => {
      try {
        const data = await apiRequest('/api/candidates');
        setCandidates(data);
      } catch (err) {
        setError(err.message || 'Unable to load candidates');
      } finally {
        setLoading(false);
      }
    };

    loadCandidates();
  }, []);

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Candidate pool</p>
          <h2>Candidates</h2>
        </div>
        <Link to="/resume-upload" className="primary-btn">Upload resume</Link>
      </section>

      <div className="card">
        {loading ? <p>Loading candidates...</p> : error ? <p className="error">{error}</p> : candidates.length === 0 ? <p className="label">No candidates yet.</p> : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Source</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td>
                    <div className="row">
                      <div className="avatar">{(candidate.full_name || candidate.name || '').split(' ').map((part) => part[0]).join('')}</div>
                      <div>
                        <strong>{candidate.full_name || candidate.name}</strong>
                        <div className="label">{candidate.location}</div>
                      </div>
                    </div>
                  </td>
                  <td>{candidate.current_role || candidate.role}</td>
                  <td>{candidate.status}</td>
                  <td>{candidate.source}</td>
                  <td><Link to={`/candidates/${candidate.id}`} className="secondary-btn">View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default CandidatesListPage;
