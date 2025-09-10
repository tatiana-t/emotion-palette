import { useEffect } from 'react';
import classnames from 'classnames';
import chroma from 'chroma-js';
import { useDataStore } from 'src/storage';
import colors from './colors';
import './styles.scss';

interface Props {
  onAnswer: (isAnswered: boolean) => void;
}

const ColorPicker: React.FC<Props> = ({ onAnswer }) => {
  const selectedColor = useDataStore((state) => state.today.color);
  const updateToday = useDataStore((state) => state.updateToday);
  // const [selectedColor, setSelectedColor] = useState('');

  const handleChangeColor = (color: string) => {
    // setSelectedColor(color);
    updateToday({ color });
    onAnswer(!!color);
  };

  useEffect(() => {
    if (!selectedColor) return;
    const appEl: HTMLElement | null = document.querySelector('.app');
    if (!appEl) return;

    const isDarkColor = chroma(selectedColor).luminance() < 0.7;
    const fontColor = isDarkColor
      ? chroma(selectedColor).brighten(3).saturate(1).hex()
      : chroma(selectedColor).darken(2.6).saturate(2).hex();

    if (!isDarkColor) {
      document.querySelector('.app')?.classList.add('theme_dark');
    } else {
      document.querySelector('.app')?.classList.remove('theme_dark');
    }

    appEl.style.setProperty('--color-selected', selectedColor);
    appEl.style.setProperty('--color-selected-font', fontColor);
  }, [selectedColor]);

  return (
    <div className={classnames('color-picker')}>
      {/* <div className="container">
        <div className="color-picker__title">Выберите цвет, который наиболее резонирует с вашим текущим состоянием</div>
      </div> */}
      <div className="color-picker__list">
        {colors.map((colorGroup, i) => {
          return (
            <div key={i} className="color-picker__item">
              {colorGroup.map((color) => {
                return (
                  <div className="" key={color}>
                    <label
                      className={classnames('color-picker__label', {
                        'color-picker__label_active': color === selectedColor,
                      })}
                      style={{ backgroundColor: color }}
                    >
                      <input
                        name="color"
                        type="radio"
                        className="color-picker__input"
                        checked={selectedColor === color}
                        onChange={() => handleChangeColor(color)}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorPicker;
