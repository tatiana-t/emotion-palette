import { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useDataStore } from 'src/storage';
import list from 'src/data/emotions';
import './styles.scss';

interface Props {
  onAnswer: (isAnswered: boolean) => void;
}

const EmotionSelect: React.FC<Props> = ({ onAnswer }) => {
  const updateToday = useDataStore((state) => state.updateToday);
  const today = useDataStore((state) => state.today);
  const [filterValue, setFilterValue] = useState('');
  const [listToRender, setListToRender] = useState(list);

  useEffect(() => {
    const filteredList = list.map((group) => {
      return {
        title: group.title,
        items: group.items.filter((item) => {
          return item.toLowerCase().includes(filterValue.toLowerCase());
        }),
      };
    });
    setListToRender(filteredList);
  }, [filterValue]);

  const onChange = (value: string) => {
    onAnswer(!!value);
    updateToday({ emotion: value });
  };

  const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  return (
    <div className="emotion-select">
      <div className="emotion-select__menu">
        <div className="emotion-select__filter">
          <input type="text" value={filterValue} onChange={onChangeFilter} placeholder="Фильтр" />
        </div>
        <div className="emotion-select__list">
          {listToRender.map((group) => {
            if (!group.items.length) return null;

            return (
              <div className="emotion-select__group" key={group.title}>
                <div className="emotion-select__options">
                  {group.items.map((option) => {
                    return (
                      <div
                        className={classnames('emotion-select__option', {
                          'emotion-select__option_active': option === today.emotion,
                        })}
                        key={option}
                      >
                        <input id={option} name="emotion" type="radio" onChange={() => onChange(option)} />
                        <label
                          htmlFor={option}
                          style={{ borderColor: option === today.emotion ? today.color : 'transparent' }}
                        >
                          {option}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmotionSelect;
