import { createRoot } from 'react-dom/client';

import { App } from './App';
import { RouterProvider, StoreProvider } from './providers';

import './styles/globals.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StoreProvider>
    <RouterProvider>
      <App />
    </RouterProvider>
  </StoreProvider>,
);
