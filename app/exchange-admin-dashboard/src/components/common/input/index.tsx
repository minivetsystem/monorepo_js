import React, { FC, ReactElement } from 'react';
import { Grid, Typography, InputProps, OutlinedInput } from '@mui/material';

interface IProps {
  label?: string;
}

export const Input: FC<InputProps & IProps> = (props): ReactElement => {
  const { label, sx, ...rest } = props;
  return (
    <Grid container>
      {label && (
        <Grid item xs={12} md={4.2}>
          <Typography variant="h5" fontWeight={600}>
            {label}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12} md={6}>
        <OutlinedInput sx={{ ...sx, width: '100%', fontSize: 16 }} {...rest} />
      </Grid>
    </Grid>
  );
};
