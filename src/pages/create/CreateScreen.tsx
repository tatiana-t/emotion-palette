import { useSearchParams } from 'react-router';
import ColorPicker from 'src/components/colorPicker';
import EmotionSelect from 'src/components/emotionSelect';
import Multitext from 'src/components/multitext';
import SingleText from 'src/components/singleText';
import Selection from 'src/components/selection';
import CreateScreenNavigation from './components/CreateScreenNavigation';
import steps from 'src/data/steps';
import SCREEN_IDS from 'src/data/screenIds';
import type { IScreen, IIds } from 'src/types';
import './styles.scss';

const CreateScreen: React.FC = () => {
  const [searchParams] = useSearchParams();
  const currentSscreenId = searchParams.get('id') as IIds;

  const currentScreen: IScreen = steps[currentSscreenId || SCREEN_IDS.color];

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

  const renderQuestion = () => {
    switch (currentScreen.type) {
      case 'text':
        return <SingleText id={currentScreen.id} />;
      case 'multitext':
        return <Multitext id={currentScreen.id} list={currentScreen.list} />;
      case 'select':
        return <Selection id={currentScreen.id} options={currentScreen.options} />;
      case 'ColorPicker':
        return <ColorPicker />;
      case 'EmotionSelect':
        return <EmotionSelect />;
      default:
        return null;
    }
  };

  return (
    <div className="create-screen">
      <div className="create-screen__title container">{currentScreen.title}</div>
      <div className="create-screen__content container">
        <div className="create-screen__content-inner">{renderQuestion()}</div>
      </div>
      <div className="container ">
        <CreateScreenNavigation currentScreen={currentScreen} buttonText={currentScreen.actionText || 'Дальше'} />
      </div>
    </div>
  );
};

export default CreateScreen;
