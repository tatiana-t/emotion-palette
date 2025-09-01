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
        icons: [{ purpose: 'any', sizes: 'any', src: 'assets/icons/icon-palette.svg', type: 'image/svg' }],

        theme_color: '#8936FF',
        background_color: '#2EC6FE',
        orientation: 'portrait',
        lang: 'ru-RU',
        scope: 'https://hereandnowcreation.art/palette',
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
