import { useEffect } from 'react';
import classnames from 'classnames';
import chroma from 'chroma-js';
import { useDataStore } from 'src/store';
import './styles.scss';

function hslToRgb(h: number, s: number, l: number) {
  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  let m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return `rgb(${Math.round((r + m) * 255)}, ${Math.round((g + m) * 255)}, ${Math.round((b + m) * 255)})`;
}

const getColorsByCircle = () => {
  const colors = [];
  for (let hue = 1; hue < 310; hue += 35) {
    const shades = [];

    for (let i = 1; i <= 3; i++) {
      const step = i / 3;
      let saturation = 0.9;
      let lightness = 0.97 - step * 0.85; // от светлого к тёмному

      // Можно плавно снижать насыщенность для "загрязнённого" вида:
      // saturation = 0.9 - step * 0.6;

      const color = hslToRgb(hue, saturation, lightness);
      shades.push(color);
    }

    colors.push(shades);
  }
  return colors;
};

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

  const setDark = () => {
    if (!selectedColor) return;

    const isDarkColor = chroma(selectedColor).luminance() < 0.5;
    if (!isDarkColor) {
      document.querySelector('.app')?.classList.add('theme_dark');
    } else {
      document.querySelector('.app')?.classList.remove('theme_dark');
    }
  };

  useEffect(() => {
    setDark();
  }, [selectedColor]);

  return (
    <div className={classnames('color-picker')}>
      <div className="container">
        {!selectedColor && (
          <div className="color-picker__title">
            Выберите цвет, который наиболее резонирует с вашим текущим состоянием
          </div>
        )}
      </div>
      <div className="color-picker__list">
        {getColorsByCircle().map((colorGroup, i) => {
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
