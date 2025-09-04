import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      // registerType: 'autoUpdate',
      includeAssets: ['/public/logo.svg'],
      strategies: 'injectManifest',
      // srcDir: 'src/workers',
      // filename: 'sw.ts',
      // devOptions: {
      //   enabled: true, // Включить в dev (с ограничениями)
      //   type: 'module', // Использовать модульный worker
      // },
      manifest: {
        name: 'Палитра настроений',
        short_name: 'Палитра',
        start_url: '/palette',
        display: 'standalone',
        icons: [{ sizes: '180x180', src: 'logo.svg' }],

        // theme_color: '#8936FF',
        background_color: '#f5f5f5',
        orientation: 'portrait',
        lang: 'ru-RU',
        // scope: '/palette',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],
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
