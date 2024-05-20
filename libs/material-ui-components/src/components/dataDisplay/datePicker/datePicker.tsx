import React, { useState } from 'react';
import { Box, MenuItem, FormControl } from '@mui/material';
import { SelectWrapper, OutlinedInputWrapper } from './datePicker.style';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const dates = Array.from({ length: 31 }, (_, i) => i + 1);

export const DatePicker = () => {
  const [value, setValue] = useState<number>(new Date().getDate());

  return (
    <Box mr={1.3}>
      <FormControl>
        <SelectWrapper
          displayEmpty
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          input={<OutlinedInputWrapper />}
          IconComponent={KeyboardArrowDownOutlinedIcon}
          sx={{
            color: 'text.disabled',
            svg: {
              color: 'text.secondary',
              width: '1.5em',
              height: '1.2em',
            },
          }}
        >
          {dates.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </SelectWrapper>
      </FormControl>
    </Box>
  );
};
