import chroma from 'chroma-js';

export const setColorsCssVars = (selectedColor: string | undefined) => {
  const appEl: HTMLElement | null = document.querySelector('.app');
  if (!appEl) return;

  if (!selectedColor) {
    appEl.style.setProperty('--color-selected', 'initial');
    appEl.style.setProperty('--color-selected-font', 'initial');
    return;
  }

  const luminance = Number(chroma(selectedColor).luminance().toFixed(1));
  let fontColor: string;

  if (luminance <= 0.6) {
    fontColor = '#ffffff';
  } else {
    fontColor = chroma(selectedColor).darken(2.6).saturate(2).hex(); //'#444444';
  }

  appEl.style.setProperty('--color-selected', selectedColor);
  appEl.style.setProperty('--color-selected-font', fontColor);
};
