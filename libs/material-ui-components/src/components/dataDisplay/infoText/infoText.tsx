import React, { FC, ReactElement } from 'react';
import { Typography, TypographyProps } from '@mui/material';
import { IInfoMessageProps } from './infoText.interface';

export const InfoText: FC<IInfoMessageProps & TypographyProps> = (
  props,
): ReactElement => {
  const { infoMessage, style, ...rest } = props;
  return (
    <Typography
      variant="body2"
      sx={{
        color: 'info.light',
        fontSize: '13px',
        latterSpacing: '0.01em',
        ...style,
      }}
      {...rest}
    >
      {infoMessage}
    </Typography>
  );
};
