import React, { FC, ReactElement } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { IToggleIcons } from './toggleIcons.interface';

export const ToggleIcons: FC<IToggleIcons> = (props): ReactElement => {
  const { options, onChange, value } = props;

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={onChange}
      aria-label="text alignment"
      sx={{ height: '44px' }}
    >
      {Array.isArray(options) &&
        options?.map((item, index) => (
          <ToggleButton value={item.value} key={index}>
            {item.icon}
          </ToggleButton>
        ))}
    </ToggleButtonGroup>
  );
};
