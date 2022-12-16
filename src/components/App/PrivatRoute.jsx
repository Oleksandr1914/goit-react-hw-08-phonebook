import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const token = useSelector(state => state.root.auth.token);

  return token ? (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/login" />
  );
}
