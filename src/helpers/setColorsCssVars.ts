import chroma from 'chroma-js';

export const setColorsCssVars = (selectedColor: string | undefined) => {
  const appEl: HTMLElement | null = document.querySelector('.app');
  if (!appEl) return;

  if (!selectedColor) {
    appEl.style.setProperty('--color-selected', 'initial');
    appEl.style.setProperty('--color-selected-font', 'initial');
    return;
  }

  const isDarkColor = chroma(selectedColor).luminance() < 0.7;
  const fontColor = isDarkColor
    ? chroma(selectedColor).brighten(3).saturate(1).hex()
    : chroma(selectedColor).darken(2.6).saturate(2).hex();

  if (isDarkColor) {
    document.querySelector('.app')?.classList.remove('theme_dark');
  } else {
    document.querySelector('.app')?.classList.add('theme_dark');
  }

  appEl.style.setProperty('--color-selected', selectedColor);
  appEl.style.setProperty('--color-selected-font', fontColor);
};
