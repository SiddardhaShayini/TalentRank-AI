import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { apiRequest, setAuthSession } from '../utils/api';

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', company: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!form.name) nextErrors.name = 'Name is required';
    if (!form.email) nextErrors.email = 'Email is required';
    if (!form.company) nextErrors.company = 'Company is required';
    if (!form.password || form.password.length < 6) nextErrors.password = 'Password must be at least 6 characters';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await apiRequest('/api/auth/register', {
        method: 'POST',
        body: {
          name: form.name,
          email: form.email,
          company: form.company,
          password: form.password,
        },
      });
      setAuthSession(response);
      toast.success('Account created successfully');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      setErrors({ form: error.message || 'Registration failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-card">
      <p className="eyebrow">Start hiring smarter</p>
      <h1>Create your recruiter account</h1>
      <p>Set up your workspace and launch AI ranked hiring pipelines.</p>
      <form onSubmit={handleSubmit} style={{ marginTop: 18 }}>
        <div className="form-grid">
          <label>
            Full name
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            {errors.name && <span className="error">{errors.name}</span>}
          </label>
          <label>
            Work email
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {errors.email && <span className="error">{errors.email}</span>}
          </label>
          <label>
            Company
            <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            {errors.company && <span className="error">{errors.company}</span>}
          </label>
          <label>
            Password
            <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            {errors.password && <span className="error">{errors.password}</span>}
          </label>
        </div>
        {errors.form && <p className="error">{errors.form}</p>}
        <button className="primary-btn" type="submit" style={{ marginTop: 14, width: '100%' }} disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>
      <div className="auth-links">
        <span>Already a user?</span>
        <Link to="/login">Log in</Link>
      </div>
    </div>
  );
}

export default RegisterPage;
