import React, { FC, ReactElement } from 'react';
import { Select, MenuItem, Checkbox } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { IDropdownProps } from './multiSelect.interface';
import { DropdownInput } from './multiSelect.style';

export const MultiSelect: FC<IDropdownProps> = (props): ReactElement => {
  const { options, style, onChange, onBlur, value, placeholder } = props;

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    onChange(
      typeof event.target.value === 'string'
        ? event.target.value.split(',')
        : event.target.value,
    );
  };

  return (
    <Select
      input={<DropdownInput />}
      defaultValue={[]}
      IconComponent={KeyboardArrowDownOutlinedIcon}
      renderValue={(selected: string[]) =>
        selected.length === 0 ? placeholder : selected?.join(', ')
      }
      sx={style}
      multiple
      onChange={handleChange}
      value={value}
      onBlur={onBlur}
    >
      {Array.isArray(options) &&
        options?.map((name, index) => {
          const isChecked = Array.isArray(value) && value?.indexOf(name) > -1;
          return (
            <MenuItem key={index} value={name}>
              <Checkbox checked={isChecked} />
              {name}
            </MenuItem>
          );
        })}
    </Select>
  );
};
