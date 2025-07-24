import { TextArea } from '@gravity-ui/uikit';
import useStore from 'src/store/data';
import './styles.scss';
import useUIStore from 'src/store/ui';

// const questionsList = [
//   {
//     id: '1',
//     text: 'Запишите свои ассоциации с выбранным цветом',
//     answer: '',
//   },
//   {
//     id: '2',
//     text: 'Что этот цвет хочет вам сказать?',
//     answer: '',
//   },
//   {
//     id: '3',
//     text: 'Какое настроение у этого цвета?',
//     answer: '',
//   },
// ];

interface Props {
  onAnswer: (isAnswered: boolean) => void;
}

const Questions: React.FC<Props> = ({ onAnswer }) => {
  const { today, updateTodayDescription } = useStore((state) => state);
  const setAnswer = (id: string, answer: string) => {
    updateTodayDescription(id, answer);
    onAnswer(!!answer);
  };
  return (
    <div className="questions">
      <div className="questions__list">
        <div className="questions__item questions__item_description">
          <p>questions description</p>
        </div>
        {today.description.map((item) => {
          return (
            <div className="questions__item" key={item.id}>
              {/* <label className="questions__label" htmlFor={item.id}>
                {item.text}
              </label> */}
              <TextArea
                id={item.id}
                view="normal"
                size="l"
                rows={7}
                placeholder={item.text}
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
