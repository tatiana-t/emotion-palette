import SCREEN_IDS from 'src/data/screenIds';
import options from 'src/data/options';
import questions from 'src/data/questions';
import type { IScreen } from 'src/types';

const steps: IScreen[] = [
  {
    id: SCREEN_IDS.color,
    type: 'ColorPicker',
    title: 'Выберите цвет, который соответствует вашему настроению или просто нравится в данный момент',
  },
  {
    id: SCREEN_IDS.reflection,
    type: 'multitext',
    title: 'Запишите свои ощущения с выбранным цветом. Нужно ответить хотя бы на один вопрос.',
    list: questions,
  },
  {
    id: SCREEN_IDS.reflectionType,
    type: 'select',
    title: 'Как этот цвет соотносится с вашим состоянием',
    options: options[SCREEN_IDS.reflectionType],
  },
  {
    id: SCREEN_IDS.compensate,
    type: 'text',
    title: 'Чего не достает в текущем состоянии, чтобы оно стало желаемым?',
    dependency: { id: SCREEN_IDS.reflectionType, value: 'no' },
  },
  {
    id: SCREEN_IDS.like,
    type: 'text',
    title: 'Как ваше текущее состояние соотносится с описанным? В чем их отличия?',
    dependency: { id: SCREEN_IDS.reflectionType, value: 'like' },
  },
  {
    id: SCREEN_IDS.targetEmotion,
    type: 'EmotionSelect',
    title: 'Выберите эмоцию, наиболее точно описывающую ваше текущее состояние',
    actionText: 'Добавить',
  },
];

export default steps;
