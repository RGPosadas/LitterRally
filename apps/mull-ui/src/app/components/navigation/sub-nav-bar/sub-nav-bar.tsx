import { IRoute } from '@mull/types';
import React, { CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import './sub-nav-bar.scss';

export interface SubNavBarProps {
  style?: CSSProperties;
  className?: string;
  routes: IRoute[];
}

export const SubNavBar = ({ style, className, routes }: SubNavBarProps) => {
  const navLinks = routes.map((route) => {
    const testid = 'subnavigation-' + route.displayName.toLowerCase().replace(' ', '') + '-button';
    return (
      <NavLink
        key={route.url}
        to={route.url}
        className="subnavigation-link"
        activeClassName="active"
        data-testid={testid}
      >
        {route.displayName}
      </NavLink>
    );
  });
  return (
    <div className={`sub-nav-bar-container ${className}`} style={style}>
      <div className="inner-cont">{navLinks}</div>
    </div>
  );
};

export default SubNavBar;
