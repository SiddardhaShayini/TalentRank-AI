import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { apiRequest, setAuthSession } from '../utils/api';

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!form.email) nextErrors.email = 'Email is required';
    if (!form.password) nextErrors.password = 'Password is required';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: { email: form.email, password: form.password },
      });
      setAuthSession(response);
      toast.success('Signed in successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Login failed');
      setErrors({ form: error.message || 'Login failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-card">
      <p className="eyebrow">Welcome back</p>
      <h1>Log into TalentRank AI</h1>
      <p>Access your recruiting workspace and AI ranking insights.</p>
      <form onSubmit={handleSubmit} style={{ marginTop: 18 }}>
        <div className="form-grid" style={{ gridTemplateColumns: '1fr' }}>
          <label>
            Email
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
          <label>
            Password
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            {errors.password && <span className="error">{errors.password}</span>}
          </label>
        </div>
        {errors.form && <p className="error">{errors.form}</p>}
        <button className="primary-btn" type="submit" style={{ marginTop: 14, width: '100%' }} disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Log in'}
        </button>
      </form>
      <div className="auth-links">
        <span>New here?</span>
        <Link to="/register">Create account</Link>
      </div>
    </div>
  );
}

export default LoginPage;
