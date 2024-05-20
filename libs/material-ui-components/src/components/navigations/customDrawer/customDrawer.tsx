import React, { FC, ReactElement, PropsWithChildren } from 'react';
import { Drawer } from '@mui/material';
import { ICustomDrawer } from './customDrawer.interface';

export const CustomDrawer: FC<ICustomDrawer & PropsWithChildren> = (
  props,
): ReactElement => {
  const { anchor, open, onClose, children } = props;
  return (
    <React.Fragment key={anchor}>
      <Drawer anchor={anchor} open={open} onClose={onClose}>
        {children}
      </Drawer>
    </React.Fragment>
  );
};
