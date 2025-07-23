import { useState } from 'react';
import classnames from 'classnames';
import useStore from 'src/store';
import './style.scss';

const colors = ['red', 'green', 'yellow', 'pink'];

const ColorPicker = () => {
  const updateCurrentDay = useStore((state) => state.updateCurrentDay);
  const [selectedColor, setSelectedColor] = useState('');

  const handleChangeColor = (color: string) => {
    setSelectedColor(color);
    updateCurrentDay({ color });
  };

  return (
    <div className="color-picker">
      {colors.map((color) => {
        return (
          <div key={color} className="color-picker__item">
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
};

export default ColorPicker;
