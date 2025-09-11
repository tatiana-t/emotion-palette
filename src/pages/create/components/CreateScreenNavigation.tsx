import { useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router';
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

  const [searchParams, setSearchParams] = useSearchParams();

  const { isNextStepAvailable, clearAdding } = useUIStore((state) => state);

  useEffect(() => {
    return () => {
      clearTodayAdd();
      clearAdding();
    };
  }, [clearTodayAdd, clearAdding]);

  useEffect(() => {
    if (!today.color) {
      setSearchParams({ id: steps.color.id });
    }
  }, [searchParams, today.color, setSearchParams]);

  const onAdd = () => {
    saveColor(today);
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

  const getNextScreenId = () => {
    const stepsArr = Object.values(steps);
    const currentScreenIdx = stepsArr.findIndex((item) => item.id === searchParams.get('id'));
    for (let i = currentScreenIdx + 1; i < stepsArr.length; i++) {
      const screen = stepsArr[i];
      // if (!screen.dependency) return stepsArr[i].id;

      if (!screen.dependency || today[screen.dependency.id] === screen.dependency.value) {
        return stepsArr[i].id;
      }
    }
    return stepsArr[currentScreenIdx + 1].id;
  };

  const onIncrementCurrentStep = () => {
    if (!isValue()) return;
    const stepsArr = Object.values(steps);
    const currentScreenIdx = stepsArr.findIndex((item) => item.id === searchParams.get('id'));
    if (currentScreenIdx === Object.values(steps).length - 1) {
      onAdd();
      return;
    }

    const nextScreenId = getNextScreenId();
    setSearchParams({ id: `${nextScreenId}` });
    // navigate({
    //   search: `?id=${nextScreenId}`,
    // });
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
