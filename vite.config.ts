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
        scope: '/palette',
        display: 'standalone',
        icons: [
          { src: 'icon.svg', sizes: 'any', purpose: 'any maskable' },
          { src: 'icon.png', sizes: 'any', purpose: 'maskable' },
          { src: 'icon-512.png', sizes: '512x512', purpose: 'any' },
        ],
        screenshots: [
          {
            src: 'screenshot.png',
            sizes: '916x1626',
            type: 'image/png',
            label: 'Экран выбора цвета',
          },
          {
            src: 'screenshot-desktop.png',
            sizes: '2270x1632',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Экран выбора цвета',
          },
        ],
        theme_color: '#f5f5f5',
        background_color: '#f5f5f5',
        orientation: 'portrait',
        lang: 'ru-RU',
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
        additionalData: `@use 'src/styles/mixins.scss' as *;`,
      },
    },
  },
});
