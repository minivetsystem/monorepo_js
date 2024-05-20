import React, { FC, ReactElement } from 'react';
import { Grid } from '@mui/material';
import { Branding, Footer, Copyright, FooterMenu } from '../../../index';
import { FooterWrap, FooterLogo } from './footerCustom.style';
import { IFooterCustom } from './footerCustom.interface';

export const FooterCustom: FC<IFooterCustom> = (props): ReactElement => {
  const { footerMenu, footerLogo, copyrightText, onNavigate } = props;

  return (
    <Grid
      container
      sx={{
        width: '100%',
      }}
    >
      <Footer>
        <FooterWrap container mt={3}>
          <FooterLogo item xs={12} sm={3} md={2}>
            <Branding logo={footerLogo} onNavigate={(val) => onNavigate(val)} />
          </FooterLogo>
          <Grid item xs={12} sm={6} md={8}>
            <FooterMenu
              footerMenu={footerMenu}
              onNavigate={(val) => onNavigate(val)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            mb={2}
            sx={{ textAlign: { xs: 'center', md: 'right' } }}
          >
            <Copyright copyrightText={copyrightText} />
          </Grid>
        </FooterWrap>
      </Footer>
    </Grid>
  );
};
