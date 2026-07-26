import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="auth-card" style={{ textAlign: 'center' }}>
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or may have moved.</p>
      <Link to="/dashboard" className="primary-btn" style={{ display: 'inline-block', marginTop: 16 }}>Back to dashboard</Link>
    </div>
  );
}

export default NotFoundPage;
