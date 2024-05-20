import React, { FC, ReactElement } from 'react';
import { Stack, Typography, Link } from '@mui/material';
import { FooterMenuWrap } from './footerMenu.style';
import { IFooterMenuProps } from './footerMenu.interface';

export const FooterMenu: FC<IFooterMenuProps> = (props): ReactElement => {
  const { footerMenu, onNavigate } = props;

  return (
    <FooterMenuWrap flexDirection="row">
      {Array.isArray(footerMenu) &&
        footerMenu?.map((item, index) => (
          <Stack key={index}>
            <Link onClick={() => onNavigate(item.href ?? '/')}>
              <Typography
                variant="h5"
                sx={{ cursor: 'pointer' }}
                color="background.paper"
              >
                {item.menu}
              </Typography>
            </Link>
            {Array.isArray(item.subMenu) &&
              item.subMenu?.map((subItem, i) => (
                <Typography
                  key={i}
                  variant="subtitle2"
                  color="background.paper"
                  sx={{ cursor: 'pointer' }}
                >
                  {subItem}
                </Typography>
              ))}
          </Stack>
        ))}
    </FooterMenuWrap>
  );
};
