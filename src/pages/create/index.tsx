import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import classnames from 'classnames';
import { ArrowRight } from '@gravity-ui/icons';
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

// const initialSteps: IStep[] = ;

const PageCreate: React.FC = () => {
  const navigate = useNavigate();
  const today = useStore((state) => state.today);
  const addHistoryItem = useStore((state) => state.addHistoryItem);

  const { currentStep, incrementCurrentStep, clearTodayAdd } = useStore((state) => state);

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
  // const Step = steps[currentStep].stepId;
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

  const clearAdd = () => {
    addHistoryItem(today);
    // const list = steps.map((item) => ({ ...item, isAnswered: false }));
    // console.log('list', list === steps);
    // setSteps(list);
    clearTodayAdd();
  };

  const onNextStep = () => {
    if (currentStep === steps.length - 1) {
      clearAdd();
      navigate('/history');
      return;
    }
    incrementCurrentStep();
  };
  return (
    <div className="page-create" style={{ backgroundColor: today.color }}>
      <button
        className={classnames('page-create__button', {
          'page-create__button_visible': steps[currentStep].isAnswered,
        })}
        onClick={onNextStep}
      >
        <ArrowRight />
      </button>
      <CurrentStepComponent
        // className="page-create__palette"
        onAnswer={(isAnswered: boolean) => setIsAnswered(steps[currentStep].stepId, isAnswered)}
      />
    </div>
  );
};

export default PageCreate;
