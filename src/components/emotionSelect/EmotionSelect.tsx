import { useState, useEffect } from 'react';
import Chip from 'src/components/uikit/chip';
import { useDataStore } from 'src/storage';
import list from 'src/data/emotions';
import './styles.scss';

const EmotionSelect: React.FC = () => {
  const updateField = useDataStore((state) => state.updateField);
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
    updateField('targetEmotion', value);
  };

  const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  return (
    <div className="emotion-select">
      <div className="emotion-select__filter">
        <input id="emotion-filter" type="text" value={filterValue} onChange={onChangeFilter} placeholder="Фильтр" />
      </div>
      <div className="emotion-select__list">
        {listToRender.map((group) => {
          if (!group.items.length) return null;

          return (
            <div className="emotion-select__group" key={group.title}>
              {group.items.map((option) => {
                return (
                  <Chip
                    key={option}
                    text={option}
                    onClick={() => onChange(option)}
                    isSelected={today.targetEmotion === option}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmotionSelect;
