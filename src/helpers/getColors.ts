import chroma from 'chroma-js';

export const getFontColor = (selectedColor: string) => {
  if (!selectedColor) return;

  const isDarkColor = chroma(selectedColor).luminance() < 0.7;
  const fontColor = isDarkColor
    ? chroma(selectedColor).brighten(3).saturate(1).hex()
    : chroma(selectedColor).darken(2.6).saturate(2).hex();

  return fontColor;
  // appEl.style.setProperty('--color-selected', selectedColor);
  // appEl.style.setProperty('--color-selected-font', fontColor);
};
