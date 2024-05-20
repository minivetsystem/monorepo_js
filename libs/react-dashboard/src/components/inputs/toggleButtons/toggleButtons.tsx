import React, { FC, ReactElement } from 'react';
import { ToggleButton, Box, Typography } from '@mui/material';
import { IToggleSelects } from './toggleButtons.interface';
import { ToggleButtonGroupList } from './toggleButtons.style';

export const ToggleButtons: FC<IToggleSelects> = (props): ReactElement => {
  const { options, style, label, onChange, value } = props;

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string,
  ) => {
    onChange(newValue);
  };

  return (
    <Box>
      {label && (
        <Typography
          variant="subtitle2"
          sx={{ color: 'text.primary', marginBottom: '6px' }}
        >
          {label}
        </Typography>
      )}
      <ToggleButtonGroupList value={value} onChange={handleChange} exclusive>
        {Array.isArray(options) &&
          options?.map((item, index) => (
            <ToggleButton value={item} key={index} sx={style}>
              {item}
            </ToggleButton>
          ))}
      </ToggleButtonGroupList>
    </Box>
  );
};
