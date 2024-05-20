import React, { FC, ReactElement } from 'react';
import { Header, Navbar, SeoTags, Branding, Menu } from '../../../index';
import dynamic from 'next/dynamic';
import { ITopbar } from './topbar.interface';

const RightSection = dynamic(
  async () => (await import('@monorepo/material-ui-components')).RightSection,
  { ssr: false },
);

export const Topbar: FC<ITopbar> = (props): ReactElement => {
  const {
    logo,
    seoTitle,
    pages,
    userData,
    handleLogout,
    onRegistriesClick,
    onEditUserInfo,
    onNavigate,
  } = props;
  return (
    <Header>
      <SeoTags title={seoTitle} />
      <Navbar>
        <Branding logo={logo} onNavigate={(val) => onNavigate(val)} />
        <Menu pages={pages} onNavigate={(val, type) => onNavigate(val, type)} />
        <RightSection
          onNavigate={onNavigate}
          handleLogout={handleLogout}
          onRegistriesClick={onRegistriesClick}
          onEditUserInfo={onEditUserInfo}
          userData={userData}
        />
      </Navbar>
    </Header>
  );
};
