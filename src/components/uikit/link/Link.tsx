import classnames from 'classnames';
import type { ReactElement } from 'react';
import { NavLink } from 'react-router';
import './styles.scss';

interface Props {
  url: string;
  text?: string;
  className?: string;
  children?: ReactElement;
}

const Link = ({ url, text, className, children }: Props) => {
  if (children)
    return (
      <NavLink to={url} className={classnames('ui-link', className)} viewTransition>
        {children}
      </NavLink>
    );
  return (
    <NavLink to={url} className={classnames('ui-link', className)} viewTransition>
      {text}
    </NavLink>
  );
};

export default Link;
