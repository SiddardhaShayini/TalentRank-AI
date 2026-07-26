import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';

function ResumeUploadPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', role: '', skills: '', experience: '' });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Candidate name is required';
    if (!form.email.trim()) nextErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = 'Enter a valid email address';
    if (!file) nextErrors.file = 'Please select a resume file';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('name', form.name.trim());
    formData.append('email', form.email.trim());
    formData.append('role', form.role.trim());
    formData.append('skills', form.skills.trim());
    formData.append('experience', form.experience);

    setIsUploading(true);
    try {
      const result = await apiRequest('/api/resume/upload', { method: 'POST', body: formData });
      toast.success('Resume analyzed and ranked successfully');
      const candidateId = result?.candidate?.id;
      if (candidateId) {
        navigate(`/candidates/${candidateId}`);
      } else {
        navigate('/ranking-results');
      }
    } catch (error) {
      toast.error(error.message || 'Resume upload failed');
      setErrors({ form: error.message || 'Resume upload failed' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Resume intake</p>
          <h2>Upload resume</h2>
        </div>
      </section>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Candidate name *
              <input
                value={form.name}
                onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors((p) => ({ ...p, name: '' })); }}
                placeholder="e.g. Jane Smith"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </label>
            <label>
              Email *
              <input
                type="email"
                value={form.email}
                onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors((p) => ({ ...p, email: '' })); }}
                placeholder="e.g. jane@company.com"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </label>
            <label>
              Role / Title
              <input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. Senior Product Designer"
              />
            </label>
            <label>
              Skills (comma-separated)
              <input
                value={form.skills}
                onChange={(e) => setForm({ ...form, skills: e.target.value })}
                placeholder="e.g. Figma, React, TypeScript"
              />
            </label>
            <label>
              Years of experience
              <input
                type="number"
                min="0"
                max="50"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                placeholder="e.g. 5"
              />
            </label>
            <label>
              Resume file *
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                  setErrors((prev) => ({ ...prev, file: '' }));
                }}
              />
              {errors.file && <span className="error">{errors.file}</span>}
            </label>
          </div>
          {errors.form && <p className="error" style={{ marginTop: 10 }}>{errors.form}</p>}
          <div className="row" style={{ marginTop: 16 }}>
            <button className="primary-btn" type="submit" disabled={isUploading}>
              {isUploading ? 'Processing...' : 'Analyze with AI'}
            </button>
            <button className="secondary-btn" type="button" onClick={() => navigate('/candidates')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResumeUploadPage;
