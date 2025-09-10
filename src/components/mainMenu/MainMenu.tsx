import { useLocation } from 'react-router';
import classnames from 'classnames';
import Link from 'src/components/uikit/link';
import Icon from 'src/components/uikit/icon';
import useDataStore from 'src/storage/store';
import { getFontColor } from 'src/helpers/getColors';
import './styles.scss';

const MainMenu = () => {
  const color = useDataStore((state) => state.currentColor);
  const location = useLocation();
  console.log('', location.pathname.split('/').length);
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div
      className={classnames('main-menu', {
        'main-menu_colored': location.pathname.split('/').length > 2,
      })}
      style={{ backgroundColor: color?.color, color: getFontColor(color?.color) }}
    >
      <div className="main-menu__list">
        <div className="main-menu__item">
          <Link url="/history">
            <Icon icon="history" />
          </Link>
        </div>
        <div className="main-menu__item main-menu__item_add">
          <Link url="/">
            <Icon icon="plus" />
          </Link>
        </div>
        <div className="main-menu__item">
          <Link url="/about">
            <Icon icon="i" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
