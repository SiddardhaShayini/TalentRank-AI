import { Navigate, Outlet } from 'react-router-dom';
import { getAuthToken } from '../utils/api';

function ProtectedRoute() {
  const token = getAuthToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;