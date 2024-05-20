import React, { FC, ReactElement } from 'react';
import { Select as Dropdown, MenuItem, Typography, Box } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { IDropdownProps } from './select.interface';
import { DropdownInput } from './select.style';

export const Select: FC<IDropdownProps> = (props): ReactElement => {
  const {
    options,
    style,
    placeholder,
    onChange,
    value = '',
    error,
    label,
  } = props;

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    onChange(event.target.value);
  };

  return (
    <Box>
      {label && <Typography variant="body1">{label}</Typography>}
      <Dropdown
        displayEmpty
        input={<DropdownInput />}
        IconComponent={KeyboardArrowDownOutlinedIcon}
        renderValue={(renderValue: string) =>
          renderValue ? renderValue : placeholder ?? 'Choose option here'
        }
        sx={{ width: '100%', ...style }}
        value={value}
        onChange={handleChange}
        error={error}
      >
        {Array.isArray(options) &&
          options?.map((name, index) => (
            <MenuItem key={index} value={name}>
              {name}
            </MenuItem>
          ))}
      </Dropdown>
    </Box>
  );
};
