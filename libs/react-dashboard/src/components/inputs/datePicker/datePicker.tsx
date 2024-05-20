import React, { FC, ReactElement } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { IDatePicker } from './datePicker.interface';
import { DatePickerWrapper } from './datePicker.style';

export const DatePicker: FC<IDatePicker> = (props): ReactElement => {
  const { label, style, onChange, value, inputRef } = props;
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
          onChange={onChange}
          InputAdornmentProps={{ position: 'start' }}
          renderInput={(params) => <TextField {...params} sx={style} />}
          inputRef={inputRef}
        />
      </LocalizationProvider>
    </Box>
  );
};
