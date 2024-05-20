import React, { FC, ReactElement } from 'react';
import { Box, Typography, InputProps } from '@mui/material';
import { IInput } from './input.interface';
import { OutlinedInputWrapper } from './input.style';

export const Input: FC<IInput & InputProps> = (props): ReactElement => {
  const { label, style, ...rest } = props;
  return (
    <Box sx={{ ...style }}>
      {label && (
        <Typography
          variant="subtitle1"
          sx={{ color: 'text.primary', marginBottom: '6px' }}
        >
          {label}
        </Typography>
      )}
      <OutlinedInputWrapper {...rest} value={rest?.value || ''} />
    </Box>
  );
};
