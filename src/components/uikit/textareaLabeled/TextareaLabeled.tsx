import classnames from 'classnames';
import Textarea from 'src/components/uikit/textarea';
import Label from 'src/components/uikit/label';
import type { Props as TextareaProps } from 'src/components/uikit/textarea';
import type { Props as LabelProps } from 'src/components/uikit/label';
import './styles.scss';

const TextareaLabeled = ({ id, text, name, value, onChange, className }: TextareaProps & Omit<LabelProps, 'forId'>) => {
  return (
    <div className={classnames('textarea-labeled', className)}>
      <Label forId={id} text={text} className="textarea-labeled__label" />
      <Textarea className="textarea-labeled__field" name={name} id={id} onChange={onChange} value={value} />
    </div>
  );
};

export default TextareaLabeled;
