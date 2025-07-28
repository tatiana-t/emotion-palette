import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      src: '/src',
    },
  },
  base: '/palette',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'src/styles/theme.scss' as *;`,
      },
    },
  },
});
