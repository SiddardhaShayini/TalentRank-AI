import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { apiRequest } from '../utils/api';

function EditJobPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({ title: '', department: '', location: '', type: 'Full-time', priority: 'High', description: '', status: 'active' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await apiRequest(`/api/jobs/${id}`);
        setForm({
          title: data.title || '',
          department: data.department || '',
          location: data.location || '',
          type: data.employment_type || data.type || 'Full-time',
          priority: data.priority || 'High',
          description: data.description || '',
          status: data.status || 'active',
        });
      } catch (error) {
        toast.error(error.message || 'Unable to load job');
      }
    };

    loadJob();
  }, [id]);

  const validate = () => {
    const nextErrors = {};
    if (!form.title) nextErrors.title = 'Role title is required';
    if (!form.department) nextErrors.department = 'Department is required';
    if (!form.location) nextErrors.location = 'Location is required';
    if (!form.description) nextErrors.description = 'Description is required';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await apiRequest(`/api/jobs/${id}`, {
        method: 'PUT',
        body: {
          title: form.title,
          department: form.department,
          location: form.location,
          type: form.type,
          priority: form.priority,
          description: form.description,
          status: form.status,
        },
      });
      toast.success('Job updated successfully');
      navigate('/jobs');
    } catch (error) {
      toast.error(error.message || 'Unable to update job');
      setErrors({ form: error.message || 'Unable to update job' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Update position</p>
          <h2>Edit Job</h2>
        </div>
      </section>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>Job title<input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
            <label>Department<input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} /></label>
            <label>Location<input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></label>
            <label>Employment type<select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}><option>Full-time</option><option>Contract</option><option>Part-time</option></select></label>
            <label>Priority<select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}><option>High</option><option>Medium</option><option>Low</option></select></label>
            <label>Description<textarea rows="4" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
          </div>
          {errors.form && <p className="error">{errors.form}</p>}
          <div className="row" style={{ marginTop: 18 }}>
            <button className="primary-btn" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save changes'}</button>
            <button className="secondary-btn" type="button" onClick={() => navigate('/jobs')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditJobPage;
