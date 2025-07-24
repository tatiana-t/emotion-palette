import { useState } from 'react';
import classnames from 'classnames';
import useStore from 'src/store/data';
import './styles.scss';

function hslToRgb(h, s, l) {
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
  for (let hue = 1; hue < 310; hue += 15) {
    const shades = [];

    for (let i = 1; i <= 7; i++) {
      const step = i / 7;
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

const ColorPicker = ({ className, onAnswer }: { className?: string; onAnswer: (isAnswered: boolean) => void }) => {
  const updateToday = useStore((state) => state.updateToday);
  const [selectedColor, setSelectedColor] = useState('');

  const handleChangeColor = (color: string) => {
    setSelectedColor(color);
    updateToday({ color });
    onAnswer(!!color);
  };

  const colors1 = [
    [
      '#fcf0f1',
      '#facfd2',
      '#ffabaf',
      '#ff8085',
      '#f86368',
      '#e65054',
      '#d63638',
      '#b32d2e',
      '#8a2424',
      '#691c1c',
      '#451313',
      '#240a0a',
    ],
    [
      '#f0f6fc',
      '#c5d9ed',
      '#9ec2e6',
      '#72aee6',
      '#4f94d4',
      '#3582c4',
      '#2271b1',
      '#135e96',
      '#0a4b78',
      '#043959',
      '#01263a',
      '#00131c',
    ],
    [
      '#f6f7f7',
      '#f0f0f1',
      '#dcdcdc',
      '#c3c4c7',
      '#a7aaad',
      '#8c8f94',
      '#787c82',
      '#646970',
      '#50575e',
      '#3c434a',
      '#2c3338',
      '#1d2327',
      '#101517',
    ],
    [
      '#fcf9e8',
      '#f5e6ab',
      '#f2d675',
      '#f0c33c',
      '#dba617',
      '#bd8600',
      '#996800',
      '#755100',
      '#614200',
      '#4a3200',
      '#362400',
      '#211600',
    ],
    [
      '#edfaef',
      '#b8e6bf',
      '#68de7c',
      '#1ed14b',
      '#00ba37',
      '#00a32a',
      '#008a20',
      '#007017',
      '#005c12',
      '#00450c',
      '#003008',
      '#001c05',
    ],
  ];
  return (
    <div className={classnames('color-picker', className)}>
      <div className="color-picker__title">Выберите цвет, который наиболее резонирует с вашим текущим состоянием</div>
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
