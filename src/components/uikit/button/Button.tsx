import type { ReactNode } from 'react';
import classnames from 'classnames';
import './styles.scss';

interface Props {
  onClick: () => void;
  text?: string;
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
}

const Button = ({ text, onClick, className, disabled, children }: Props) => {
  return (
    <button
      className={classnames('ui-button', className, {
        'ui-button_disabled': disabled,
      })}
      disabled={disabled}
      onClick={onClick}
    >
      {text || children}
    </button>
  );
};

export default Button;
