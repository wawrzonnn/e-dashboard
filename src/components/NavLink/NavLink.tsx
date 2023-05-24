import React, { PropsWithChildren, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './NavLink.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface NavLinkProps {
   to: string;
}

export const NavLink = ({ to, children }: PropsWithChildren<NavLinkProps>) => {
   const location = useLocation();
   const isActive = location.pathname === to;

   const linkClasses = cx({
      [styles.navLink]: true,
      [styles.active]: isActive,
   });

   return (
      <Link to={to} className={linkClasses}>
         {children}
      </Link>
   );
};
