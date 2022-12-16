import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function PublicRoute() {
  const token = useSelector(state => state.root.auth.token);

  return !token ? <Outlet /> : <Navigate to="/contacts" />;
}
