import React, { FC, ReactElement, useState } from 'react';
import {
  Select,
  Box,
  MenuItem,
  FormControl,
  Typography,
  FormHelperText,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { Stack, Chip } from '@mui/material';
import { MListSelect } from './multiListSelect.interface';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

export const MultiListSelect: FC<MListSelect> = (props): ReactElement => {
  const { options = [], style, placeholder, value, setValue, label, error, multiple, inputRef } = props; // Providing default value for options

  const [selectedValues, setSelectedValues] = useState<string[]>(Array.isArray(value) ? value : []);

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selected = e.target.value as string[];
    setSelectedValues(selected);
    setValue?.(selected);
  };

  const handleChipDelete = (chipToDelete: string) => () => {
    console.log(chipToDelete)
    const updatedValues = selectedValues.filter((chip) => chip !== chipToDelete);
    setSelectedValues(updatedValues);
    setValue?.(updatedValues);
  };

  return (
    <Box sx={{ ...style }}>
      <Typography variant="subtitle1" sx={{ color: 'var(--black1)', marginBottom: '6px' }}>
        {label}
      </Typography>
      <FormControl fullWidth error={error?.message ? true : false} size="small">
        <Select
          displayEmpty
          inputRef={inputRef}
          multiple={multiple}
          value={selectedValues}
          onChange={handleSelectChange}
          IconComponent={KeyboardArrowDownOutlinedIcon}
          renderValue={(selected) => (
            selected.length ?
            <Stack gap={1} direction="row" flexWrap="wrap">
              {(selected as string[]).map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={handleChipDelete(value)}
                  deleteIcon={<CancelIcon   onMouseDown={(event) => event.stopPropagation()} />}
                />
              ))}
            </Stack> : (placeholder ?? 'Choose option here')
          )}
         
          sx={{
            fontSize: '16px',
            color: 'var(--black1)',
            border: error?.message?.length > 0 ? '1px solid red' : null,
            paddingRight: '15px',
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{error.message}</FormHelperText>}
      </FormControl>
    </Box>
    
  );
};
