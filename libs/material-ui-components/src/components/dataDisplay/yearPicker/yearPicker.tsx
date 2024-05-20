import React, { useState } from 'react';
import { Box, MenuItem, FormControl } from '@mui/material';
import { OutlinedInputWrapper, SelectWrapper } from './yearPicker.style';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const years = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i,
);

export const YearPicker = () => {
  const [value, setValue] = useState<number>(new Date().getFullYear());

  return (
    <Box>
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
          {years.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </SelectWrapper>
      </FormControl>
    </Box>
  );
};
