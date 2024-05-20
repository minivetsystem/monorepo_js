import React, { FC, ReactElement, PropsWithChildren } from 'react';
import { ImagesWrap } from './imagesWrapper.style';

export const ImagesWrapper: FC<PropsWithChildren> = (props): ReactElement => {
  const { children } = props;
  return <ImagesWrap>{children}</ImagesWrap>;
};
