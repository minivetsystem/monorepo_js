import React, { FC, ReactElement } from 'react';
import { Select, Box, MenuItem, FormControl, Typography } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { IDropdownProps } from './dropdown.interface';
import { DropdownInput } from './dropdown.style';

export const Dropdown: FC<IDropdownProps> = (props): ReactElement => {
  const { options, style, placeholder, value, onChange, label, error } = props;
  return (
    <Box sx={{ ...style }}>
      <Typography
        variant="subtitle1"
        sx={{ color: 'text.primary', marginBottom: '6px' }}
      >
        {label}
      </Typography>
      <FormControl fullWidth>
        <Select
          displayEmpty
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          input={<DropdownInput />}
          IconComponent={KeyboardArrowDownOutlinedIcon}
          renderValue={(value) =>
            value?.length
              ? Array.isArray(value)
                ? value.join(', ')
                : options?.find((item) => item.value === value)?.label
              : placeholder ?? 'Choose option here'
          }
          sx={{
            fontSize: '16px',
            svg: {
              color: 'text.secondary',
              right: 10,
            },
            paddingRight: '15px',
          }}
          error={error}
        >
          {Array.isArray(options) &&
            options?.map((option, index) => (
              <MenuItem
                key={index}
                value={option.value}
                sx={{ whiteSpace: 'normal' }}
              >
                {option.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};
