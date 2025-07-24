import { Select } from '@gravity-ui/uikit';
import useStore from 'src/store/data';
import './styles.scss';

interface Props {
  onAnswer: (isAnswered: boolean) => void;
}

const list = [
  { value: '1', content: 'Радость' },
  { value: '2', content: 'Печаль' },
];

const EmotionSelect: React.FC<Props> = ({ onAnswer }) => {
  const updateToday = useStore((state) => state.updateToday);

  const onUpdate = (value: string[]) => {
    onAnswer(!!value[0]);
    updateToday({ emotion: list.find((item) => item.value === value[0])?.content });
  };
  return (
    <div className="emotion-select">
      <Select options={list} filterable placeholder="Выберите эмоцию" onUpdate={onUpdate} />
    </div>
  );
};

export default EmotionSelect;
