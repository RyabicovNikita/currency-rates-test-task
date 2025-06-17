import { Navigate, Outlet } from 'react-router-dom';

import type { UserAurh } from '@shared/types';

export const ProtectedRoute = ({ isAuth }: UserAurh) => {
  if (!isAuth) return <Navigate to="/login" replace />;

  return <Outlet />;
};
