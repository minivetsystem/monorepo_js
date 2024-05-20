import React, { FC, ReactElement } from 'react';
import { Box, Typography, InputProps } from '@mui/material';
import { ITextInputProps } from './textInput.interface';
import { OutlinedInputWrapper } from './textInput.style';

export const TextInput: FC<ITextInputProps & InputProps> = (
  props,
): ReactElement => {
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
      <OutlinedInputWrapper {...rest} />
    </Box>
  );
};
