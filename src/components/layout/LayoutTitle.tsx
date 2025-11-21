import classnames from 'classnames';

interface Props {
  text: string;
  className?: string;
}
const LayoutTitle = ({ text, className }: Props) => {
  return <div className={classnames('layout-title', className)}>{text}</div>;
};
export default LayoutTitle;
