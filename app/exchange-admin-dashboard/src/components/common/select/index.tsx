import React, { FC, ReactElement } from 'react';
import {
  Select as SelectComponent,
  Grid,
  MenuItem,
  FormControl,
  Typography,
  OutlinedInput,
  SelectProps,
} from '@mui/material';

interface IProps {
  options: { title: string; value: any }[];
}

export const Select: FC<SelectProps & IProps> = (props): ReactElement => {
  const { options, label, sx, ...rest } = props;

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
        <FormControl>
          <SelectComponent
            input={<OutlinedInput />}
            sx={{ ...sx, minWidth: 128, fontSize: 16 }}
            {...rest}
          >
            {Array.isArray(options) &&
              options?.map(({ title, value }, index) => (
                <MenuItem key={index} value={value} sx={{ fontSize: 16 }}>
                  {title}
                </MenuItem>
              ))}
          </SelectComponent>
        </FormControl>
      </Grid>
    </Grid>
  );
};
