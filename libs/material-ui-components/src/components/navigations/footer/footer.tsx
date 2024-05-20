import React, { FC, ReactElement, PropsWithChildren } from 'react';
import { FooterWrap } from './footer.style';

export const Footer: FC<PropsWithChildren> = (props): ReactElement => {
  const { children } = props;
  return (
    <FooterWrap
      sx={{ backgroundColor: 'text.primary' }}
    >
      {children}
    </FooterWrap>
  );
};
