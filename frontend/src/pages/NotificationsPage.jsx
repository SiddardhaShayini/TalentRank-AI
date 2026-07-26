import { useEffect, useState } from 'react';
import { apiRequest } from '../utils/api';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await apiRequest('/api/notifications');
        setNotifications(data);
      } catch (err) {
        setError(err.message || 'Unable to load notifications');
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  return (
    <div>
      <section className="page-header">
        <div>
          <p className="eyebrow">Activity center</p>
          <h2>Notifications</h2>
        </div>
      </section>

      <div className="card">
        {loading ? <p>Loading notifications...</p> : error ? <p className="error">{error}</p> : notifications.length === 0 ? <p className="label">No notifications yet.</p> : notifications.map((item) => (
          <div key={item.id} className="list-card" style={{ marginBottom: 10 }}>
            <div>
              <strong>{item.title}</strong>
              <div className="label">{item.detail}</div>
            </div>
            <span className="pill">{item.createdAt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsPage;
