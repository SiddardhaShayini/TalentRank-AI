import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../utils/api';

const matchColor = (level) => {
  if (!level) return 'info';
  const l = level.toLowerCase();
  if (l === 'excellent') return 'success';
  if (l === 'strong') return 'info';
  return 'warning';
};

function RankingResultsPage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadResults = async () => {
      try {
        const data = await apiRequest('/api/ranking');
        setCandidates(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Unable to load ranking results');
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, []);

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">AI scoring</p>
          <h2>Ranking results</h2>
        </div>
        <Link to="/analytics" className="secondary-btn">Open analytics</Link>
      </section>

      <div className="card">
        <h3>Ranked shortlist</h3>

        {loading && <p>Loading ranking results...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && candidates.length === 0 && (
          <p className="label">No ranked candidates yet. Upload a resume to get started.</p>
        )}

        {candidates.map((candidate) => (
          <div key={candidate.id} className="list-card" style={{ marginBottom: 10 }}>
            <div>
              <strong>{candidate.full_name}</strong>
              <div className="label">
                {candidate.current_role || '—'}
                {candidate.location ? ` · ${candidate.location}` : ''}
              </div>
              {candidate.summary && (
                <div className="label" style={{ marginTop: 4, fontStyle: 'italic' }}>{candidate.summary}</div>
              )}
            </div>
            <div className="row">
              {candidate.score != null && (
                <span className="pill info" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {Math.round(candidate.score)}%
                </span>
              )}
              {candidate.match_level && (
                <span className={`pill ${matchColor(candidate.match_level)}`}>{candidate.match_level}</span>
              )}
              <Link to={`/candidates/${candidate.id}`} className="ghost-btn">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RankingResultsPage;
