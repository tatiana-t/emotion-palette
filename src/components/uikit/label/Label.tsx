import classnames from 'classnames';
import './styles.scss';

interface Props {
  text: string;
  forId: string;
  className?: string;
}

const Label = ({ text, forId, className }: Props) => {
  return (
    <label className={classnames('ui-label', className)} htmlFor={forId}>
      {text}
    </label>
  );
};

export default Label;
