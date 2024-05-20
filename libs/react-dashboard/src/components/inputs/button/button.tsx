import React, { FC, ReactElement } from 'react';
import { Button as CustomButton, ButtonProps } from '@mui/material';
import { IButton } from './button.interface';

export const Button: FC<IButton & ButtonProps> = (props): ReactElement => {
  const { buttonText, style, ...rest } = props;

  const defaultStyle = {
    height: '48px',
    borderRadius: '4px',
  };

  return (
    <CustomButton sx={{ ...defaultStyle, ...style }} {...rest}>
      {buttonText}
    </CustomButton>
  );
};
