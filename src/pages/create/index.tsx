import ColorPicker from 'src/components/colorPicker';
import useStore from 'src/store';
import { TextArea } from '@gravity-ui/uikit';
import './styles.scss';

const PageCreate: React.FC = () => {
  const updateAnswer = useStore(({ updateAnswer }) => updateAnswer);
  const setAnswer = (id: string, answer: string) => {
    updateAnswer(id, answer);
  };
  return (
    <div className="page-create">
      <h2>Выберите цвет, который наиболее резонирует с вашим текущим состоянием</h2>
      <ColorPicker />
      <div className="page-create__item">
        <label htmlFor="assotiasions">Запишите свои ассоциации с выбранным цветом</label>
        <TextArea
          id="assotiasions"
          view="normal"
          size="l"
          rows={5}
          onChange={(e) => setAnswer('1', e.target.value)}
        ></TextArea>
      </div>
      <div className="page-create__item">
        <label htmlFor="talk">Что этот цвет хочет вам сказать?</label>
        <TextArea id="talk" view="normal" size="l" rows={5} onChange={(e) => setAnswer('2', e.target.value)}></TextArea>
      </div>
    </div>
  );
};

export default PageCreate;
