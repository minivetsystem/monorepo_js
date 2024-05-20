import React, { FC, ReactElement, PropsWithChildren } from 'react';
import { Grid } from '@mui/material';

export const FullWidthSection: FC<PropsWithChildren> = (
  props,
): ReactElement => {
  const { children } = props;
  return (
    <Grid container sx={{ position: 'relative', width: '100%' }}>
      {children}
    </Grid>
  );
};
