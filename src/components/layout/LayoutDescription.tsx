import classnames from 'classnames';

interface Props {
  text: string;
  className?: string;
}
const LayoutDescription = ({ text, className }: Props) => {
  return <div className={classnames('layout-description', className)}>{text}</div>;
};
export default LayoutDescription;
