import './styles.scss';

interface Props {
  text: string;
  forId: string;
}

const Label = ({ text, forId }: Props) => {
  return (
    <label className="ui-label" htmlFor={forId}>
      {text}
    </label>
  );
};

export default Label;
