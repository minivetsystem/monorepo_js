import React, { FC, ReactElement, PropsWithChildren } from 'react';
import { InnerWrap } from './innerContainer.style';

export const InnerContainer: FC<PropsWithChildren> = (props): ReactElement => {
  const { children } = props;
  return <InnerWrap>{children}</InnerWrap>;
};
