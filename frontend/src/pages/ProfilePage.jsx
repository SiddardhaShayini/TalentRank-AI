import { Link } from 'react-router-dom';
import { getCurrentUser } from '../utils/api';

function ProfilePage() {
  const user = getCurrentUser();
  const initials = (user?.name || 'U').split(' ').map((p) => p[0]).join('').toUpperCase();

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Team profile</p>
          <h2>Profile</h2>
        </div>
        <Link to="/settings" className="secondary-btn">Edit settings</Link>
      </section>

      <div className="grid grid-2">
        <div className="card">
          <div className="row">
            <div className="avatar" style={{ width: 56, height: 56 }}>{initials}</div>
            <div>
              <h3>{user?.name || 'Recruiter'}</h3>
              <p className="label">{user?.email || ''}</p>
              {user?.company && <p className="label">{user.company}</p>}
            </div>
          </div>
          <div className="row" style={{ marginTop: 12 }}>
            <span className="pill info">{user?.role || 'recruiter'}</span>
          </div>
        </div>
        <div className="card">
          <h3>Preferences</h3>
          <p className="label">Auto-rank new resumes</p>
          <p className="label">Weekly hiring digest</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
