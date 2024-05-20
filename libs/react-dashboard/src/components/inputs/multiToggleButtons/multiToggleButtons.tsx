import React, { FC, ReactElement } from 'react';
import { ToggleButton, Box, Typography } from '@mui/material';
import { IToggleSelects } from './multiToggleButtons.interface';
import { ToggleButtonGroupList } from './multiToggleButtons.style';

export const ToggleSelects: FC<IToggleSelects> = (props): ReactElement => {
  const { options, onChange, style, label, value } = props;

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValues: string[],
  ) => {
    onChange(newValues);
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
      <ToggleButtonGroupList value={value} onChange={handleChange}>
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
