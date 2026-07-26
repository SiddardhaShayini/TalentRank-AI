import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiRequest } from '../utils/api';

function CandidateDetailsPage() {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCandidate = async () => {
      try {
        const data = await apiRequest(`/api/candidates/${id}`);
        setCandidate(data);
      } catch (err) {
        setError(err.message || 'Unable to load candidate');
      } finally {
        setLoading(false);
      }
    };

    loadCandidate();
  }, [id]);

  if (loading) return <div className="card">Loading candidate...</div>;
  if (error) return <div className="card error">{error}</div>;
  if (!candidate) return <div className="card">Candidate not found.</div>;

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Candidate profile</p>
          <h2>{candidate.full_name || candidate.name}</h2>
        </div>
        <Link to="/ranking-results" className="primary-btn">View AI ranking</Link>
      </section>

      <div className="grid grid-2">
        <div className="card">
          <div className="row">
            <div className="avatar" style={{ width: 56, height: 56 }}>
              {(candidate.full_name || candidate.name || '').split(' ').map((part) => part[0]).join('')}
            </div>
            <div>
              <h3>{candidate.current_role || candidate.role}</h3>
              <p className="label">{candidate.location} · {candidate.experience_years || candidate.experience} years</p>
            </div>
          </div>
          <div className="row" style={{ marginTop: 14 }}>
            <span className="pill info">{candidate.status}</span>
            <span className="pill">{candidate.source}</span>
          </div>
        </div>
        <div className="card">
          <h3>Contact info</h3>
          <p className="label">Email: {candidate.email}</p>
          <p className="label">Phone: {candidate.phone || 'Not provided'}</p>
          <p className="label">Created: {candidate.created_at || candidate.uploadedAt}</p>
        </div>
      </div>

      <div className="card">
        <h3>Skills</h3>
        <div className="row">
          {(candidate.skills || '').split(',').filter(Boolean).map((skill) => <span key={skill} className="pill">{skill}</span>)}
        </div>
      </div>
    </div>
  );
}

export default CandidateDetailsPage;
