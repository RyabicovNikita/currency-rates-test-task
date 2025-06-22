// vitest.config.ts
import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: path.resolve(__dirname, './src/6-shared/config/tests/setup.ts'),
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/0-app'),
      '@process': path.resolve(__dirname, './src/1-process'),
      '@pages': path.resolve(__dirname, './src/2-pages'),
      '@widgets': path.resolve(__dirname, './src/3-widgets'),
      '@features': path.resolve(__dirname, './src/4-features'),
      '@entities': path.resolve(__dirname, './src/5-entities'),
      '@shared': path.resolve(__dirname, './src/6-shared'),
      '@assets': path.resolve(__dirname, './src/6-shared/assets'),
    },
  },
});
