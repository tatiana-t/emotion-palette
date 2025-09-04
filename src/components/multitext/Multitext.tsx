import Textarea from 'src/components/uikit/textarea';
import Label from 'src/components/uikit/label';
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
          <div key={item.id} className="multi-text__item">
            <Label forId={item.id} text={item.text} />
            <Textarea
              name={id}
              id={item.id}
              onChange={(e) => onChange(item.id, e.target.value)}
              value={values.find((value) => value.id === item.id)?.value || ''}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Multitext;
