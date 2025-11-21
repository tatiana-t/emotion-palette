import Link from 'src/components/uikit/link';
import Icon from 'src/components/uikit/icon';

import './styles.scss';

const MainMenu = () => {
  return (
    <div className="main-menu">
      <div className="main-menu__list">
        <div className="main-menu__item">
          <Link url="/about">
            <Icon icon="i" />
          </Link>
        </div>
        <div className="main-menu__item main-menu__item_add">
          <Link url="/?id=color">
            <Icon icon="plus" />
          </Link>
        </div>
        <div className="main-menu__item">
          <Link url="/history">
            <Icon icon="history" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
