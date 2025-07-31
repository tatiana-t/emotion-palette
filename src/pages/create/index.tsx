import { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useDataStore, useUIStore } from 'src/store';
import stepsData from 'src/data/steps';
import type { IStep } from './types';
import './styles.scss';

const PageCreate: React.FC = () => {
  const today = useDataStore(({ today }) => today);
  const currentStep = useUIStore((state) => state.currentStep);
  const updateNavigationAvailable = useUIStore((state) => state.updateNavigationAvailable);

  const [steps, setSteps] = useState<IStep[]>(stepsData);

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
      isPrevStepAvailable: currentStep > 0 && !!steps[currentStep],
    });
  }, [steps[currentStep].isAnswered]);

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     // You can add a condition here to decide if you want to prompt the user
  //     const shouldPrompt = steps.some(({ isAnswered }) => !isAnswered); // Replace with your actual condition

  //     if (shouldPrompt) {
  //       event.preventDefault(); // Standard for older browsers
  //       event.returnValue = ''; // Standard for modern browsers
  //       return ''; // Return an empty string for some browsers
  //     }
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);
  const CurrentStepComponent = steps[currentStep].component;

  const setIsAnswered = (isAnswered: boolean) => {
    updateStep(isAnswered);
  };

  return (
    <div
      className={classnames('page-create', {
        'page-create_shadow': !!today.color,
      })}
      style={{ backgroundColor: today.color }}
    >
      <CurrentStepComponent onAnswer={setIsAnswered} />
    </div>
  );
};

export default PageCreate;
