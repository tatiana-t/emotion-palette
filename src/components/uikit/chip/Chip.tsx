import classnames from 'classnames';
import './styles.scss';

interface Props {
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

const Chip = ({ text, isSelected, onClick }: Props) => {
  return (
    <div
      className={classnames('ui-chip', {
        'ui-chip_active': isSelected,
      })}
      tabIndex={1}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Chip;
