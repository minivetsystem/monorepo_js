import React, { FC, ReactElement } from 'react';
import { Box, Typography, TextField, TextFieldProps } from '@mui/material';
import { ITextAreaProps } from './textArea.interface';

export const TextArea: FC<ITextAreaProps & TextFieldProps> = (
  props,
): ReactElement => {
  const { label, style, minRows, ...rest } = props;
  return (
    <Box>
      <Typography variant="subtitle1">{label}</Typography>
      <TextField
        multiline
        minRows={minRows}
        maxRows={minRows}
        {...rest}
        sx={{
          width: '100%',
          fieldset: {
            borderColor: 'var(--gray2)',
          },
          '& .MuiOutlinedInput-root.Mui-focused:not(.Mui-error)': {
            '& > fieldset': {
              borderColor: 'var(--gray2)',
            },
          },
          '& .MuiOutlinedInput-root.Mui-error': {
            '& > fieldset': {
              borderWidth: '2px',
            },
          },
          ...style,
        }}
      />
    </Box>
  );
};
