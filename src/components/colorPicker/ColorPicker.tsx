import chroma from 'chroma-js';
import classnames from 'classnames';
import { useDataStore } from 'src/storage';
import colors from './colors';

import './styles.scss';

const ColorPicker: React.FC = () => {
  const selectedColor = useDataStore((state) => state.today.color);
  const updateToday = useDataStore((state) => state.updateToday);

  const handleChangeColor = (color: string) => {
    updateToday({ color });
  };

  const getShadowColor = (color: string) => {
    // const element = chroma(color);
    // const background = chroma(selectedColor || '#f5f5f5');

    // const elementLuminance = element.luminance();
    // const backgroundLuminance = background.luminance();

    // let shadowColor;
    // const multiplayer = chroma(element).hex() === chroma(background).hex() ? 2 : 1;
    // const delta = Math.abs(elementLuminance - backgroundLuminance);
    // let intensity;
    // if (delta < 0.1) {
    //   intensity = 0.5; // Низкий контраст - сильная тень
    // } else if (delta < 0.3) {
    //   intensity = 0.3; // Средний контраст
    // } else {
    //   intensity = 0.2;
    // }
    // if (elementLuminance === backgroundLuminance) {
    //   intensity = 0.5;
    // }
    // console.log('get shadow', multiplayer);
    // if (elementLuminance > backgroundLuminance) {
    //   // Элемент светлее фона - затемняем для тени
    //   shadowColor = delta < 0.2 ? element.darken(intensity) : element.luminance(intensity);
    //   // shadowColor = element.darken(intensity);
    // } else if (elementLuminance < backgroundLuminance) {
    //   // Элемент темнее фона - осветляем для тени
    //   shadowColor = delta < 0.2 ? element.brighten(intensity) : element.luminance(intensity);
    //   // shadowColor = element.brighten(intensity);
    // } else {
    //   console.log(elementLuminance);
    //   shadowColor = elementLuminance > 0.4 ? element.darken(intensity) : element.brighten(intensity);
    // }

    // Добавляем прозрачность для естественного вида
    return chroma(color).alpha(0.8).css();
  };
  return (
    <div className={classnames('color-picker')}>
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
                      style={{
                        backgroundColor: color,
                        boxShadow: `0 0 2px 0 ${getShadowColor(color)}`,
                      }}
                    >
                      <span
                        className="color-picker__bg"
                        style={{
                          backgroundColor: color,
                        }}
                      ></span>
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
