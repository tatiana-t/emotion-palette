import { useLocation } from 'react-router';
import Link from 'src/components/uikit/link';
import LinkButtonCircle from 'src/components/uikit/linkButtonCircle';
import Icon from 'src/components/uikit/icon';
// import ButtonCircle from 'src/components/uikit/buttonCircle';
import './styles.scss';

const MainMenu = () => {
  const location = useLocation();
  if (location.pathname === '/') {
    return null;
  }
  return (
    <div className="main-menu">
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
