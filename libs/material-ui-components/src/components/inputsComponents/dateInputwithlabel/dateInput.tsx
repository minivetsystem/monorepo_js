import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { IDateInput } from './dateInput.interface';
import { DatePickerWrapper } from './dateInput.style';

export const DateInputWithLabel: FC<IDateInput> = (props): ReactElement => {
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
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePickerWrapper
          value={value}
          sx={borderStyle || {}}
          onChange={onChange}
          inputRef={inputRef}
          disableFuture={disableFuture}
          minDate={minDate}
          label={label}
        />
      </LocalizationProvider>
    </Box>
  );
};
