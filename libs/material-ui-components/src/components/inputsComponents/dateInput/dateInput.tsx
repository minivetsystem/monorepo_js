import React, { FC, ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { IDateInput } from './dateInput.interface';
import { DatePickerWrapper } from './dateInput.style';

export const DateInput: FC<IDateInput> = (props): ReactElement => {
  const {
    label,
    style,
    value,
    onChange,
    inputRef,
    disableFuture,
    minDate,
    borderStyle,
  } = props;

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
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePickerWrapper
          value={value}
          sx={borderStyle || {}}
          onChange={onChange}
          inputRef={inputRef}
          disableFuture={disableFuture}
          minDate={minDate}
        />
      </LocalizationProvider>
    </Box>
  );
};
