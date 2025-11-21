import type { ReactNode } from 'react';
interface Props {
  title: string;
  description?: string;
  children: ReactNode;
}
const LayoutContainer = ({ title, description, children }: Props) => {
  return (
    <div className="layout">
      <div className="layout__title">{title}</div>
      {description && <div className="layout__description">{description}</div>}
      <div className="layout__content">{children}</div>
    </div>
  );
};

export default LayoutContainer;
