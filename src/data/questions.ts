import type { IQuestion } from 'src/types';

const questionsList: IQuestion[] = [
  {
    id: 'ReflectionBody',
    text: 'Что вы почувствуете, если соприкоснетесь с этим цветом? Если он окутает или наполнит ваше тело?',
  },
  { id: 'ReflectionAssociation', text: 'Какие у вас ассоциации с выбранным цветом?' },
  { id: 'ReflectionSay', text: 'Что этот цвет может вам сказать?' },
  // { id: 'ReflectionMood', text: 'Какое настроение у этого цвета?' },
];

export default questionsList;
