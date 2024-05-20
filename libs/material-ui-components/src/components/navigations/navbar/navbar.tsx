import React, { FC, ReactElement, PropsWithChildren } from 'react';
import { NavbarContainer } from './navbar.style';

export const Navbar: FC<PropsWithChildren> = (props): ReactElement => {
  const { children } = props;
  return <NavbarContainer>{children}</NavbarContainer>;
};
