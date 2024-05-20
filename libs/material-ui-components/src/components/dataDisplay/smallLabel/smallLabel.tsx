import React, { FC, ReactElement } from 'react';
import { Typography } from '@mui/material';
import { ISmallLabel } from './smallLabel.interface';

export const SmallLabel: FC<ISmallLabel> = (props): ReactElement => {
  const { text, style } = props;
  return (
    <Typography
      variant="body2"
      sx={{ fontSize: '13px', lineHeight: '20px', mb: 1.5, mt: 4.5, ...style }}
    >
      {text}
    </Typography>
  );
};
