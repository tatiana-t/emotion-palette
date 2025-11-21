import type { IQuestion } from 'src/types';

const questionsList: IQuestion[] = [
  {
    id: 'Reflection4',
    text: 'Что вы почувствуете, если соприкоснетесь с этим цветом? Если он окутает или наполнит ваше тело?',
  },
  { id: 'Reflection1', text: 'Какие у вас ассоциации с выбранным цветом?' },
  { id: 'Reflection2', text: 'Что этот цвет может вам сказать?' },
  { id: 'Reflection3', text: 'Какое настроение у этого цвета?', disabled: true },
];

export default questionsList;
