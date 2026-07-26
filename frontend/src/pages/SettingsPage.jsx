import { useState } from 'react';
import toast from 'react-hot-toast';

function SettingsPage() {
  const [form, setForm] = useState({ notifications: true, weeklyDigest: true, aiThreshold: '92' });

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success('Settings updated');
  };

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Workspace settings</p>
          <h2>Settings</h2>
        </div>
      </section>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              AI match threshold
              <select value={form.aiThreshold} onChange={(e) => setForm({ ...form, aiThreshold: e.target.value })}>
                <option>90</option>
                <option>92</option>
                <option>94</option>
              </select>
            </label>
            <label>
              Notification delivery
              <select value={form.notifications ? 'enabled' : 'disabled'} onChange={(e) => setForm({ ...form, notifications: e.target.value === 'enabled' })}>
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
            </label>
            <label>
              Weekly digest
              <select value={form.weeklyDigest ? 'enabled' : 'disabled'} onChange={(e) => setForm({ ...form, weeklyDigest: e.target.value === 'enabled' })}>
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
            </label>
          </div>
          <div className="row" style={{ marginTop: 16 }}>
            <button className="primary-btn" type="submit">Save preferences</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;
