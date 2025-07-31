import ColorPicker from 'src/components/colorPicker';
import Questions from 'src/components/questions';
import EmotionSelect from 'src/components/emotionSelect';
import type { IStep } from 'src/pages/create/types';

const steps: IStep[] = [
  {
    stepId: 'ColorPicker',
    isAnswered: false,
    component: ColorPicker,
  },
  {
    stepId: 'Questions',
    isAnswered: false,
    component: Questions,
  },
  {
    stepId: 'Emotion',
    isAnswered: false,
    component: EmotionSelect,
  },
];

export default steps;
