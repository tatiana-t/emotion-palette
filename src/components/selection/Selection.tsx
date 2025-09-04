import classnames from 'classnames';
import type { IOption, IIds } from 'src/types';
import { useDataStore } from 'src/storage';
import './styles.scss';

interface Props {
  id: IIds;
  options: IOption[];
}

const Selection = ({ id, options }: Props) => {
  const value = useDataStore((state) => state.today[id]) as string;
  const updateField = useDataStore((state) => state.updateField);

  const clearDependentValues = () => {};

  const onClick = (optionId: string) => {
    updateField(id, optionId);
    clearDependentValues();
  };

  return (
    <div className="selection">
      {options.map((item) => {
        return (
          <div
            key={item.id}
            className={classnames('selection__item', {
              selection__item_active: item.id === value,
            })}
            tabIndex={1}
            onClick={() => onClick(item.id)}
          >
            {item.text}
          </div>
        );
      })}
    </div>
  );
};

export default Selection;
