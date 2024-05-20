import React, { useState } from 'react';
import { Box, MenuItem, FormControl } from '@mui/material';
import { SelectWrapper, OutlinedInputWrapper } from './monthPicker.style';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const names = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const MonthPicker = () => {
  const [value, setValue] = useState(names[new Date().getMonth()]);

  return (
    <Box mr={1.3}>
      <FormControl>
        <SelectWrapper
          displayEmpty
          value={value}
          onChange={(e) => setValue(e.target.value as string)}
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
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </SelectWrapper>
      </FormControl>
    </Box>
  );
};
