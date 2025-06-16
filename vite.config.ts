import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@app': resolve(__dirname, 'src/0-app'),
      '@process': resolve(__dirname, 'src/1-process'),
      '@pages': resolve(__dirname, 'src/2-pages'),
      '@widgets': resolve(__dirname, 'src/3-widgets'),
      '@features': resolve(__dirname, 'src/4-features'),
      '@entities': resolve(__dirname, 'src/5-entities'),
      '@assets': resolve(__dirname, 'src/6-shared/assets'),
      '@shared': resolve(__dirname, 'src/6-shared'),
    },
  },
});
