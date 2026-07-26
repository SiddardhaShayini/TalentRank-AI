import { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';

function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await apiRequest('/api/analytics');
        setAnalytics(data);
      } catch (err) {
        setError(err.message || 'Unable to load analytics');
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) return <div className="card">Loading analytics...</div>;
  if (error) return <div className="card error">{error}</div>;

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Performance overview</p>
          <h2>Analytics</h2>
        </div>
      </section>

      <section className="metric-row">
        <div className="metric-card">
          <div className="label">Jobs published</div>
          <div className="value">{analytics?.totalJobs ?? 0}</div>
        </div>
        <div className="metric-card">
          <div className="label">Resume matches</div>
          <div className="value">{analytics?.activeCandidates ?? 0}</div>
        </div>
        <div className="metric-card">
          <div className="label">Ranking confidence</div>
          <div className="value">{analytics?.rankingAccuracy ?? 0}%</div>
        </div>
        <div className="metric-card">
          <div className="label">Interview conversion</div>
          <div className="value">{analytics?.avgTimeToHire ?? 0} days</div>
        </div>
      </section>

      <div className="grid grid-2">
        <div className="card">
          <h3>Hiring velocity</h3>
          <p className="label">Average time to move from application to interview is backed by the live database metrics.</p>
        </div>
        <div className="card">
          <h3>Live model signals</h3>
          <div className="row">
            <span className="pill">{analytics?.rankingAccuracy ?? 0}% confidence</span>
            <span className="pill">{analytics?.activeCandidates ?? 0} candidates</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
