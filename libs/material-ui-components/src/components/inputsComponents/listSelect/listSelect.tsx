import React, { FC, ReactElement } from 'react';
import {
  Select,
  Box,
  MenuItem,
  FormControl,
  Typography,
  FormHelperText,
} from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { IListSelect } from './listSelect.interface';
import { DropdownInput } from './listSelect.style';
import { filter } from 'lodash';

export const ListSelect: FC<IListSelect> = (props): ReactElement => {
  const { options, style, placeholder, value, setValue, label, error, inputRef} = props;

  return (
    <Box sx={{ ...style }}>
      <Typography
        variant="subtitle1"
        sx={{ color: 'var(--black1)', marginBottom: '6px' }}
      >
        {label}
      </Typography>
      <FormControl fullWidth error={error?.message ? true : false}>
        <Select
          displayEmpty
          inputRef={inputRef}
          defaultValue=""
          size="small"
          onChange={(e) => setValue?.(e.target.value)}
          IconComponent={KeyboardArrowDownOutlinedIcon}
          renderValue={() =>
            value?.length
              ? Array.isArray(value)
                ? value.join(', ')
                : filter(options, { value })[0]?.name
              : placeholder ?? 'Choose option here'
          }
          
          sx={{
            fontSize: '16px',
            color: 'var(--black1)',
            border: error?.message?.length > 0 ? '1px solid red' : null,
            svg: {
              color: 'text.secondary',
              right: 10,
            },
            paddingRight: '15px',
          }}
        >
          {Array.isArray(options) &&
            options?.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                <Box display="flex" alignItems="center">
                  <img src={item.icon} alt="" />
                  <Box ml={2}>
                    <Typography variant="body1" fontWeight={700}>
                      {item.name}
                    </Typography>
                    <Typography variant="subtitle1">{item.title}</Typography>
                  </Box>
                </Box>
              </MenuItem>
            ))}
        </Select>
        {error && <FormHelperText>{error.message}</FormHelperText>}
      </FormControl>
    </Box>
  );
};
