import React, { FC, ReactElement } from 'react';
import { FormControlLabel, CheckboxProps } from '@mui/material';
import { ICheckboxProps } from './checkbox.interface';
import { CheckboxInput } from './checkbox.style';

export const Checkbox: FC<ICheckboxProps & CheckboxProps> = (
  props,
): ReactElement => {
  const { label, style, ...rest } = props;
  return (
    <FormControlLabel
      control={<CheckboxInput {...rest} />}
      label={label}
      sx={style}
    />
  );
};
