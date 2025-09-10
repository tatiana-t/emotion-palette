import classnames from 'classnames';
import Icon from 'src/components/uikit/icon';
import './styles.scss';

interface Props {
  icon: string;
  onClick: () => void;
  size?: 20;
}

const ButtonCircle = ({ icon, size, onClick }: Props) => {
  return (
    <button
      className={classnames('ui-button-circle', {
        [`ui-button-circle_${size}`]: size,
      })}
      onClick={onClick}
    >
      <Icon icon={icon} />
    </button>
  );
};

export default ButtonCircle;
