import type { IIds } from 'src/types';
import Textarea from 'src/components/uikit/textarea';
import { useDataStore } from 'src/storage';
// import './styles.scss';

interface Props {
  id: IIds;
}
const SingleText = ({ id }: Props) => {
  const today = useDataStore((state) => state.today[id]);
  const updateField = useDataStore((state) => state.updateField);
  console.log('SingleText id', id, today);

  return (
    <div className="single-text">
      <Textarea id={id} name={id} value={today as string} onChange={(e) => updateField(id, e.target.value)} />
    </div>
  );
};

export default SingleText;
