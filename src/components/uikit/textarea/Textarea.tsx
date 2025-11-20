import classnames from 'classnames';
import type { ChangeEvent } from 'react';
import './styles.scss';

export interface Props {
  name: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

const Textarea = ({ name, id, value, onChange, className }: Props) => {
  return (
    <textarea
      className={classnames('ui-textarea', className)}
      name={name}
      id={id}
      onChange={onChange}
      value={value}
    ></textarea>
  );
};

export default Textarea;
