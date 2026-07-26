import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Bell, BriefcaseBusiness, LayoutDashboard, LogOut, Menu, Search, Settings, Sparkles, UserRound, Users } from 'lucide-react';
import { apiRequest, clearAuthSession } from '../utils/api';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/jobs', label: 'Jobs', icon: BriefcaseBusiness },
  { to: '/candidates', label: 'Candidates', icon: Users },
  { to: '/resume-upload', label: 'Resume Upload', icon: Sparkles },
  { to: '/analytics', label: 'Analytics', icon: LayoutDashboard },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/profile', label: 'Profile', icon: UserRound },
  { to: '/settings', label: 'Settings', icon: Settings },
];

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    apiRequest('/api/notifications')
      .then((data) => setNotifCount(Array.isArray(data) ? data.length : 0))
      .catch(() => {});
  }, []);

  const handleLogout = () => {
    clearAuthSession();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><Sparkles size={20} /></div>
          <div>
            <h2>TalentRank AI</h2>
            <p>Recruiting OS</p>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="ghost-btn" onClick={handleLogout}><LogOut size={16} /> Logout</button>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-btn"><Menu size={18} /></button>
            <div>
              <p className="eyebrow">AI Resume Ranking</p>
              <h1>{location.pathname === '/dashboard' ? 'Overview' : location.pathname.split('/').filter(Boolean).join(' / ')}</h1>
            </div>
          </div>
          <div className="topbar-right">
            <label className="search-box">
              <Search size={16} />
              <input placeholder="Search candidates or jobs" />
            </label>
            <NavLink to="/notifications" className="icon-btn badge-btn">
              <Bell size={18} />
              {notifCount > 0 && <span>{notifCount}</span>}
            </NavLink>
          </div>
        </header>
        <div className="content-area">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
