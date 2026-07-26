import { ArrowRight, Brain, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="main-panel">
      <section className="card hero">
        <div>
          <p className="eyebrow">AI Resume Ranking Platform</p>
          <h1>Turn every incoming resume into a high-signal shortlist.</h1>
          <p>TalentRank AI helps recruiting teams score candidates instantly, prioritize top matches, and move faster with transparent insights.</p>
          <div className="row">
            <Link to="/register" className="primary-btn">Start free demo</Link>
            <Link to="/dashboard" className="secondary-btn">View product tour</Link>
          </div>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(91,124,255,.25), rgba(143,125,255,.2))' }}>
          <div className="metric-card" style={{ marginBottom: 12 }}>
            <div className="label">Match score accuracy</div>
            <div className="value">96.2%</div>
          </div>
          <div className="metric-card">
            <div className="label">Time saved per hire</div>
            <div className="value">12.4 hrs</div>
          </div>
        </div>
      </section>

      <section className="grid grid-3">
        <div className="card">
          <Brain size={20} color="#8f7dff" />
          <h3>Intelligent ranking</h3>
          <p>AI evaluates skills, experience, and fit in seconds.</p>
        </div>
        <div className="card">
          <ShieldCheck size={20} color="#2ecf8c" />
          <h3>Bias-aware review</h3>
          <p>Structured scoring encourages fair, explainable decisions.</p>
        </div>
        <div className="card">
          <TrendingUp size={20} color="#ffcc66" />
          <h3>Actionable analytics</h3>
          <p>Monitor funnel health, ranking quality, and recruiter performance.</p>
        </div>
      </section>

      <section className="card">
        <div className="page-header">
          <div>
            <p className="eyebrow">Built for modern teams</p>
            <h2>Everything you need to hire smarter</h2>
          </div>
          <Link to="/login" className="secondary-btn">Log in</Link>
        </div>
        <div className="grid grid-2">
          <div className="list-card">
            <div className="stack">
              <strong>Recruiter workspace</strong>
              <span className="label">Review jobs, candidates, and rankings in one place.</span>
            </div>
            <Sparkles size={18} />
          </div>
          <div className="list-card">
            <div className="stack">
              <strong>Resume intelligence</strong>
              <span className="label">Upload resumes and instantly get ranked matches.</span>
            </div>
            <ArrowRight size={18} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
