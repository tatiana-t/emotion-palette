import { useState } from 'react';
import classnames from 'classnames';
import ColorPicker from 'src/components/colorPicker';
import EmotionSelect from 'src/components/emotionSelect';
import Multitext from 'src/components/multitext';
import Selection from 'src/components/selection';
import ScreenNavigation from './components/ScreenNavigation';
import { useUIStore } from 'src/storage';
import stepsData from 'src/data/steps';
// import type { IStep } from './types';
import type { IScreen } from 'src/types';
import './styles.scss';
import SingleText from 'src/components/singleText';

const CreateScreen: React.FC = () => {
  // const today = useDataStore(({ today }) => today);
  const currentStepIdx = useUIStore((state) => state.currentStepIdx);
  // const updateNavigationAvailable = useUIStore((state) => state.updateNavigationAvailable);

  // const values = useDataStore((state) => state.today[id]) as { id: string; value: string }[];
  // const updateField = useDataStore((state) => state.updateField);

  const [steps, setSteps] = useState<IScreen[]>(stepsData);
  const currentScreen: IScreen = steps[currentStepIdx];

  const updateStep = (isAnswered: boolean) => {
    setSteps(
      steps.map((step: IScreen, i) => {
        if (i === currentStepIdx) {
          return {
            ...step,
            isAnswered,
          };
        }
        return step;
      }),
    );
  };

  // useEffect(() => {
  //   if (today.color) {
  //     updateStep(true);
  //   }
  // }, [today.color]);

  // useEffect(() => {
  //   updateNavigationAvailable({
  //     isNextStepAvailable: !!today[currentScreen.id],
  //     isPrevStepAvailable: currentStepIdx > 0 && !!steps[currentStepIdx],
  //   });
  // }, [steps[currentStepIdx].isAnswered]);

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

  const setIsAnswered = (isAnswered: boolean) => {
    updateStep(isAnswered);
  };

  const renderQuestion = () => {
    switch (currentScreen.type) {
      case 'text':
        return <SingleText id={currentScreen.id} />;
      case 'multitext':
        return <Multitext id={currentScreen.id} list={currentScreen.list} />;
      case 'select':
        return <Selection id={currentScreen.id} options={currentScreen.options} />;
      case 'ColorPicker':
        return <ColorPicker onAnswer={setIsAnswered} />;
      case 'EmotionSelect':
        return <EmotionSelect onAnswer={setIsAnswered} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={classnames(
        'create-screen',
        // { 'create-screen_shadow': today.color }
      )}
      // style={{ borderLeft: `5px solid ${today.color}`, borderTop: `5px solid ${today.color}` }}
    >
      <div className="create-screen__title container">{currentScreen.title}</div>
      {/* <CurrentStepComponent onAnswer={setIsAnswered} /> */}
      {/* <div className="create-screen__color" style={{ backgroundColor: today.color }}></div> */}
      <div className="create-screen__content container">
        <div className="create-screen__content-inner">{renderQuestion()}</div>
      </div>
      <div className="container ">
        <ScreenNavigation currentScreen={currentScreen} buttonText={currentScreen.actionText || 'Дальше'} />
        {/* <Button
          text={currentScreen.actionText || 'Дальше'}
          onClick={() => updateStep(true)}
          className="create-screen__button"
        /> */}
      </div>
    </div>
  );
};

export default CreateScreen;
