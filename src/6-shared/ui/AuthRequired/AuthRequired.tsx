import type { UserAurh } from '@shared/types';

interface AuthRequired extends UserAurh {
  children: React.ReactNode;
}

export const AuthRequired = ({ children, isAuth }: AuthRequired) => {
  if (!isAuth) return null;

  return children;
};
