import React, { FC, ReactElement } from 'react';
import {
  Grid,
  Typography,
  Checkbox as CheckboxComp,
  CheckboxProps,
  FormControlLabel,
} from '@mui/material';

interface IProps {
  label?: string;
  label2?: string;
}

export const Checkbox: FC<CheckboxProps & IProps> = (props): ReactElement => {
  const { label, label2, sx, ...rest } = props;
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
        <FormControlLabel
          control={<CheckboxComp defaultChecked {...rest} />}
          label={<Typography variant="h5">{label2}</Typography>}
        />
      </Grid>
    </Grid>
  );
};
