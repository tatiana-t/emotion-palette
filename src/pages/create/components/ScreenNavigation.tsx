import { useNavigate, useLocation } from 'react-router';
import classnames from 'classnames';
import Button from 'src/components/uikit/button';
import { useDataStore, useUIStore, saveColor } from 'src/storage';
import type { IScreen } from 'src/types';
import steps from 'src/data/steps';
import './styles.scss';

interface Props {
  currentScreen: IScreen;
  buttonText: string;
}
const ScreenNavigation = ({ currentScreen, buttonText }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const today = useDataStore((state) => state.today);
  const clearTodayAdd = useDataStore((state) => state.clearTodayAdd);

  const {
    // incrementCurrentStep,
    // decrementCurrentStep,
    setStepIdx,
    isNextStepAvailable,
    // isPrevStepAvailable,
    currentStepIdx,
    clearAdding,
  } = useUIStore((state) => state);

  // useEffect(() => {
  //   if (!currentScreen.dependency) return;
  //   console.log('currentScreen', currentScreen, today[currentScreen.dependency.id]);
  //   if (today[currentScreen.dependency.id] === currentScreen.dependency.value) return;
  //   incrementCurrentStep();
  // }, [currentStepIdx]);

  const onAdd = () => {
    saveColor(today);

    clearTodayAdd();
    clearAdding();
    navigate('/history', { viewTransition: true });
  };

  const isValue = () => {
    const value = today[currentScreen.id];
    if (currentScreen.type === 'multitext' && typeof value === 'object') {
      return value.some((item: { id: string; value: string }) => !!item.value);
    }
    return !!value;
  };

  // const getPrevScreenIdx = () => {
  //   for (let i = currentStepIdx - 1; i >= 0; i--) {
  //     const screen = steps[i];
  //     console.log('screen', screen);
  //     if (today[screen.id]) {
  //       return i;
  //     }
  //   }
  //   return currentStepIdx - 1;
  // };

  const getNextScreenIdx = () => {
    for (let i = currentStepIdx + 1; i < steps.length; i++) {
      const screen = steps[i];
      if (!screen.dependency) return i;

      if (today[screen.dependency.id] === screen.dependency.value) {
        return i;
      }
    }
    return currentStepIdx + 1;
  };

  const onIncrementCurrentStep = () => {
    if (!isValue()) return;
    if (currentStepIdx === steps.length - 1) {
      onAdd();
      return;
    }

    const nextScreenIdx = getNextScreenIdx();
    setStepIdx(nextScreenIdx);
  };

  // const onSetPrevScreen = () => {
  //   if (currentStepIdx === 0) {
  //     return;
  //   }

  //   const prevScreenIdx = getPrevScreenIdx();
  //   setStepIdx(prevScreenIdx);
  // };

  return (
    <div className="screen-navigation">
      {location.pathname === '/' && (
        <div className="screen-navigation__inner">
          {/* <Button
            className={classnames('screen-navigation__item', {
              navigation__item_visible: isPrevStepAvailable,
            })}
            disabled={currentStepIdx === 0}
            onClick={onSetPrevScreen}
          >
            <CircleChevronLeft width={24} height={24} />
          </Button> */}
          <Button
            className={classnames('screen-navigation__item screen-navigation__item_next', {
              navigation__item_visible: isNextStepAvailable,
            })}
            disabled={!isValue()}
            onClick={onIncrementCurrentStep}
            text={buttonText}
          />
        </div>
      )}
    </div>
  );
};

export default ScreenNavigation;
