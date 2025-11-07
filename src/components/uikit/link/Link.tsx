import classnames from 'classnames';
import type { ReactElement } from 'react';
import { NavLink } from 'react-router';
import './styles.scss';

interface Props {
  url: string;
  text?: string;
  className?: string;
  children?: ReactElement;
  state?: Record<string, string | number>;
}

const Link = ({ url, text, className, children, state }: Props) => {
  if (children)
    return (
      <NavLink to={url} state={state} className={classnames('ui-link', className)} viewTransition>
        {children}
      </NavLink>
    );
  return (
    <NavLink to={url} state={state} className={classnames('ui-link', className)} viewTransition>
      {text}
    </NavLink>
  );
};

export default Link;
