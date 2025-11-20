import TextareaLabeled from 'src/components/uikit/textareaLabeled';
import { useDataStore } from 'src/storage';
import type { IText, IIds } from 'src/types';
import './styles.scss';
// type IListItem = IText & { value: string };

interface Props {
  id: IIds;
  list: IText[];
}

const Multitext = ({ id, list }: Props) => {
  const values = useDataStore((state) => state.today[id]) as { id: string; value: string }[];
  const updateField = useDataStore((state) => state.updateField);

  const onChange = (valueId: string, value: string) => {
    let valuesToSave = [];
    const savedValue = values.some((item) => item.id === valueId);

    if (savedValue) {
      if (!value) {
        valuesToSave = values.filter((item) => item.id !== valueId);
      } else {
        valuesToSave = values.map((item) => {
          if (item.id === valueId) {
            item.value = value;
          }
          return item;
        });
      }
    } else {
      valuesToSave = [...values, { id: valueId, value }];
    }

    updateField(id, valuesToSave);
  };

  return (
    <div className="multi-text">
      {list.map((item) => {
        return (
          <TextareaLabeled
            key={item.id}
            className="multi-text__item"
            name={id}
            id={item.id}
            onChange={(e) => onChange(item.id, e.target.value)}
            text={item.text}
            value={values.find((value) => value.id === item.id)?.value || ''}
          />
        );
      })}
    </div>
  );
};

export default Multitext;
