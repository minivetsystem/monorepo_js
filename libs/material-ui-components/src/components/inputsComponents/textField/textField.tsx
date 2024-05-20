import React, { FC, ReactElement } from 'react';
import { CustomTextFieldContainer } from './textField.style';
import { Box, Typography } from '@mui/material';
import { ICustomTextField } from './textField.interface';

export const CustomTextField: FC<ICustomTextField> = (props): ReactElement => {
  const { label, style, startAdornment, placeholder, ...rest } = props;
  return (
    <Box sx={{ ...style }}>
      <Typography variant="subtitle1">{label}</Typography>
      <CustomTextFieldContainer
        placeholder={placeholder}
        InputProps={{
          startAdornment,
        }}
        {...rest}
      />
    </Box>
  );
};
