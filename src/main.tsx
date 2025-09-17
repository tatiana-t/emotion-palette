import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import LogRocket from 'logrocket';
import { ThemeProvider } from '@gravity-ui/uikit';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
// import '@gravity-ui/uikit/styles/fonts.css';
// import '@gravity-ui/uikit/styles/styles.css';

import './styles/ui-theme.css';
import './index.scss';

if (import.meta.env.PROD) {
  LogRocket.init('0493q8/emotion-palette');
}

registerSW({
  immediate: true,
  // onNeedRefresh() {
  //   // show a prompt to user
  //   const answer = confirm('Подтвердите обновление');
  //   console.log('answer', answer);
  //   if (answer) {
  //     console.log('updated');
  //     updateSW();
  //     alert('updated');
  //   } else {
  //     alert('not updated');
  //   }
  // },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/palette">
      <ThemeProvider theme="light">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
