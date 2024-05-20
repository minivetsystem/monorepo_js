import React, { FC, ReactElement, PropsWithChildren } from 'react';

export const Header: FC<PropsWithChildren> = (props): ReactElement => {
  const { children } = props;
  return (
    <div>{children}</div>
  );
};
