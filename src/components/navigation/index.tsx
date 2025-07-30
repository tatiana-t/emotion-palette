import { NavLink, useNavigate, useLocation } from 'react-router';
import classnames from 'classnames';
import { CircleChevronLeft } from '@gravity-ui/icons';
import { CircleChevronRight } from '@gravity-ui/icons';
import useStore from 'src/store/data';
import IIcon from 'src/assets/icons/icon-i.svg?react';
import IconPalette from 'src/assets/icons/icon-palette.svg?react';
import IconPlus from 'src/assets/icons/icon-plus.svg?react';
import steps from 'src/data/steps';
import './styles.scss';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    incrementCurrentStep,
    decrementCurrentStep,
    isNextStepAvailable,
    isPrevStepAvailable,
    currentStep,
    today,
    addHistoryItem,
    clearTodayAdd,
  } = useStore((state) => state);

  const onAdd = () => {
    addHistoryItem(today);
    clearTodayAdd();
    navigate('/history');
  };

  const onIncrementCurrentStep = () => {
    if (currentStep === steps.length - 1) {
      onAdd();

      return;
    }
    incrementCurrentStep();
  };

  const onDecrementCurrentStep = () => {
    if (currentStep === 0) {
      return;
    }
    decrementCurrentStep();
  };

  return (
    <div className="navigation">
      <div className="navigation__main">
        <NavLink
          to="/about"
          viewTransition
          className={({ isActive }) => (isActive ? 'navigation__item navigation__item_active' : 'navigation__item')}
        >
          <IIcon />
        </NavLink>
        <NavLink
          to="/"
          viewTransition
          className={({ isActive }) => (isActive ? 'navigation__item navigation__item_active' : 'navigation__item')}
        >
          <IconPlus />
        </NavLink>
        <NavLink
          to="/history"
          viewTransition
          className={({ isActive }) => (isActive ? 'navigation__item navigation__item_active' : 'navigation__item')}
        >
          <IconPalette />
        </NavLink>
      </div>
      {location.pathname === '/' && (
        <div className="navigation__sup">
          <button
            className={classnames('navigation__item', {
              navigation__item_visible: isPrevStepAvailable,
            })}
            onClick={onDecrementCurrentStep}
          >
            <CircleChevronLeft width={30} height={30} />
          </button>
          <button
            className={classnames('navigation__item', {
              navigation__item_visible: isNextStepAvailable,
            })}
            onClick={onIncrementCurrentStep}
          >
            <CircleChevronRight width={30} height={30} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navigation;
