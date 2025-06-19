import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppSelector } from '@process/hooks';
import { selectUserAuth } from '@process/selectors/userSelectors';
import { LoginPage } from '@pages/auth/ui';
import { ConverterPage } from '@pages/converter';
import { CurrencyPage } from '@pages/currency';
import { ProtectedRoute, PublicRoute } from '@shared/ui';

export const AppRouter = () => {
  const isUserAuth = useAppSelector(selectUserAuth);
  return (
    <Routes>
      <Route element={<PublicRoute isAuth={isUserAuth} redirectTo="/rates" />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute isAuth={isUserAuth} />}>
        <Route path="/" element={<Navigate to="/rates" replace />} />
        <Route path="/rates" element={<CurrencyPage />} />
        <Route path="/convert" element={<ConverterPage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
  );
};
