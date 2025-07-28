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
  const today = useStore((state) => state.today);

  const getValue = () => {
    const value = list.find((item) => item.content === today.emotion)?.value;
    return value ? [value] : [];
  };
  const onUpdate = (value: string[]) => {
    onAnswer(!!value[0]);
    updateToday({ emotion: list.find((item) => item.value === value[0])?.content });
  };
  return (
    <div className="emotion-select">
      <div className="emotion-select__field"></div>
      <div className="emotion-select__list"></div>
      <Select value={getValue()} options={list} filterable placeholder="Выберите эмоцию" onUpdate={onUpdate} />
    </div>
  );
};

export default EmotionSelect;
