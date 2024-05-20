import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { IDateTimeInput } from './datetimeInput.interface';
import { DateTimePickerWrapper } from './datetimeInput.style';

export const DateTimeInput: FC<IDateTimeInput> = (props): ReactElement => {
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
        <DateTimePickerWrapper
          value={value}
          label={label}
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
