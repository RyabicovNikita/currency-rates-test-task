import { Navigate, Route, Routes } from 'react-router-dom';

import { CurrencyPage } from '@pages/currency';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/rates" replace />} />
      <Route path="/rates" element={<CurrencyPage />} />
    </Routes>
  );
};
