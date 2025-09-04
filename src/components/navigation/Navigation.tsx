import { NavLink } from 'react-router';
import IIcon from 'src/assets/icons/icon-i.svg?react';
import IconPalette from 'src/assets/icons/icon-palette.svg?react';
import IconPlus from 'src/assets/icons/icon-plus.svg?react';
import './styles.scss';

const Navigation = () => {
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
    </div>
  );
};

export default Navigation;
