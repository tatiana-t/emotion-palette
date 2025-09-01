import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

// import { registerSW } from 'virtual:pwa-register';

import { ThemeProvider } from '@gravity-ui/uikit';
import App from './App.tsx';
// import '@gravity-ui/uikit/styles/fonts.css';
// import '@gravity-ui/uikit/styles/styles.css';
import './styles/ui-theme.css';
import './index.scss';

// registerSW({ immediate: true });

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/palette/sw.js')
      .then((reg) => {
        console.log('registered', reg);
      })
      .catch((e) => {
        console.error('Service worker register error: ', e);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/palette">
      <ThemeProvider theme="light">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
