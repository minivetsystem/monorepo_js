import React, { FC, ReactElement } from 'react';
import { SwitchProps } from '@mui/material';
import { CustomSwitch } from './switch.style';

export const Switch: FC<SwitchProps> = (props): ReactElement => {
  return <CustomSwitch size="medium" {...props} />;
};
