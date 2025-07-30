import { TextArea } from '@gravity-ui/uikit';
import useStore from 'src/store/data';
import questionsList from '../../../../data/questions';

import './styles.scss';

interface Props {
  onAnswer: (isAnswered: boolean) => void;
}

const Questions: React.FC<Props> = ({ onAnswer }) => {
  const today = useStore((state) => state.today);
  const updateTodayDescription = useStore((state) => state.updateTodayDescription);

  const setAnswer = (id: string, answer: string) => {
    updateTodayDescription(id, answer);
    onAnswer(!!answer);
  };

  return (
    <div className="questions">
      <div className="questions__list">
        {/* <div className="questions__item questions__item_description">
          <p>questions description</p>
        </div> */}
        {questionsList.map((item) => {
          return (
            <div className="questions__item" key={item.id}>
              <TextArea
                id={item.id}
                view="normal"
                size="l"
                rows={7}
                placeholder={item.text}
                value={today.description.find(({ id }) => id === item.id)?.answer || ''}
                className="questions__field"
                onChange={(e) => setAnswer(item.id, e.target.value)}
              ></TextArea>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Questions;
