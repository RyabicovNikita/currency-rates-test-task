import { Navigate, Outlet } from 'react-router-dom';

interface PublicRouteProps {
  isAuth: boolean;
  redirectTo?: string;
}

export const PublicRoute = ({ isAuth, redirectTo = '/' }: PublicRouteProps) => {
  if (isAuth) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};
