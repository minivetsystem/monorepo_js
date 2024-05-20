import React, { FC, ReactElement } from 'react';
import { Grid } from '@mui/material';
import {
  Branding,
  FullWidthSection,
  Footer,
  Copyright,
  SocialIcons,
  FooterMenu,
} from '../../../index';
import { FooterWrap, FooterLogo, CopyrightWrap } from './bottombar.style';
import { IBottombar } from './bottombar.interface';

export const Bottombar: FC<IBottombar> = (props): ReactElement => {
  const { footerMenu, footerLogo, copyrightText, onNavigate } = props;

  return (
    <FullWidthSection>
      <Footer>
        <FooterWrap container mt={7}>
          <FooterLogo item xs={12} md={3}>
            <Branding logo={footerLogo} onNavigate={(val) => onNavigate(val)} />
          </FooterLogo>
          <Grid item xs={12} md={9}>
            <FooterMenu
              footerMenu={footerMenu}
              onNavigate={(val) => onNavigate(val)}
            />
          </Grid>
        </FooterWrap>
        <CopyrightWrap container mt={8}>
          <Grid item xs={10}>
            <Copyright copyrightText={copyrightText} />
          </Grid>
          <Grid item xs={2}>
            <SocialIcons />
          </Grid>
        </CopyrightWrap>
      </Footer>
    </FullWidthSection>
  );
};
