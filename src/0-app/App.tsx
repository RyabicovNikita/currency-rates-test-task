import { AppRouter } from './routes/routes';
import { AppLayout } from './layouts';

export const App = () => (
  <AppLayout>
    <AppRouter />
  </AppLayout>
);
