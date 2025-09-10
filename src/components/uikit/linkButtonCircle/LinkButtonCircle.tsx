import { NavLink } from 'react-router';
import Icon from 'src/components/uikit/icon';
import './styles.scss';

interface Props {
  url: string;
  icon: string;
}

const LinkButtonCircle = ({ url, icon }: Props) => {
  return (
    <NavLink to={url} className="ui-link-button-circle">
      <Icon icon={icon} />
    </NavLink>
  );
};

export default LinkButtonCircle;
