import { useState, useEffect } from 'react';
import classnames from 'classnames';

import ColorPicker from 'src/pages/create/screen/colorPicker';
import Questions from 'src/pages/create/screen/questions';
import EmotionSelect from 'src/pages/create/screen/emotionSelect';
import useStore from 'src/store/data';

import './styles.scss';

type IStepId = 'ColorPicker' | 'Questions' | 'Emotion';

interface IStep {
  stepId: IStepId;
  isAnswered: boolean;
  component: React.FC<{ onAnswer: (isAnswered: boolean) => void }>;
}

const PageCreate: React.FC = () => {
  const today = useStore((state) => state.today);

  const { currentStep, updateNavigationAvailable } = useStore((state) => state);

  const [steps, setSteps] = useState<IStep[]>([
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
  ]);

  const updateStep = (isAnswered: boolean) => {
    setSteps(
      steps.map((step: IStep, i) => {
        if (i === currentStep) {
          return {
            ...step,
            isAnswered,
          };
        }
        return step;
      }),
    );
  };

  useEffect(() => {
    if (today.color) {
      updateStep(true);
    }
  }, [today.color]);

  useEffect(() => {
    updateNavigationAvailable({
      isNextStepAvailable: steps[currentStep].isAnswered,
      isPrevStepAvailable: currentStep > 0,
    });
  }, [currentStep, steps[currentStep].isAnswered]);

  const CurrentStepComponent = steps[currentStep].component;

  const setIsAnswered = (stepId: string, isAnswered: boolean) => {
    const updatedSteps = steps.map((item) => {
      if (item.stepId === stepId) {
        item.isAnswered = isAnswered;
      }
      return item;
    });
    setSteps(updatedSteps);
  };

  return (
    <div
      className={classnames('page-create', {
        'page-create_shadow': !!today.color,
      })}
      style={{ backgroundColor: today.color }}
    >
      <CurrentStepComponent onAnswer={(isAnswered: boolean) => setIsAnswered(steps[currentStep].stepId, isAnswered)} />
    </div>
  );
};

export default PageCreate;
