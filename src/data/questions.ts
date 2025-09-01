import type { IQuestion } from 'src/types';

const questionsList: IQuestion[] = [
  {
    id: '1',
    text: 'Запишите свои ассоциации с выбранным цветом',
    type: 'text',
  },
  {
    id: '2',
    text: 'Что этот цвет хочет вам сказать?',
    type: 'text',
  },
  {
    id: '3',
    text: 'Какое настроение у этого цвета?',
    type: 'text',
  },
  {
    id: '4',
    text: 'Это состояние соответствует вашему текущему состоянию или скорее является желаемым?',
    type: 'radio',
  },
];

export default questionsList;
