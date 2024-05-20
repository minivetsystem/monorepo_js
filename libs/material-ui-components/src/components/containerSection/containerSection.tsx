import React, { FC, ReactElement, PropsWithChildren } from 'react';
import { Grid } from '@mui/material';

export const ContainerSection: FC<PropsWithChildren> = (
  props,
): ReactElement => {
  const { children } = props;
  return (
    <Grid container justifyContent="center" alignItems="center" mt={3.5}>
      {children}
    </Grid>
  );
};
