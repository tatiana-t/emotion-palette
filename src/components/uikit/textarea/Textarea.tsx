import type { ChangeEvent } from 'react';
import './styles.scss';

interface Props {
  name: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({ name, id, value, onChange }: Props) => {
  return <textarea className="ui-textarea" name={name} id={id} onChange={onChange} value={value}></textarea>;
};

export default Textarea;
