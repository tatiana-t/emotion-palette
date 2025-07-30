import ColorPicker from 'src/pages/create/screen/colorPicker';
import Questions from 'src/pages/create/screen/questions';
import EmotionSelect from 'src/pages/create/screen/emotionSelect';
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
