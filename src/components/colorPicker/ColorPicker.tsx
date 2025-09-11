import classnames from 'classnames';
import { useDataStore } from 'src/storage';
import colors from './colors';

import './styles.scss';

const ColorPicker: React.FC = () => {
  const selectedColor = useDataStore((state) => state.today.color);
  const updateToday = useDataStore((state) => state.updateToday);
  // const [selectedColor, setSelectedColor] = useState('');

  const handleChangeColor = (color: string) => {
    // setSelectedColor(color);
    updateToday({ color });
    // onAnswer(!!color);
  };

  // useEffect(() => {
  //   setColorsCssVars(selectedColor);
  // }, [selectedColor]);

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
