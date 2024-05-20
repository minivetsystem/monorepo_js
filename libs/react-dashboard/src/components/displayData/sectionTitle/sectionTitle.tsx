import React, { FC, ReactElement } from 'react';
import { Typography } from '@mui/material';
import { ISectionTitle } from './sectionTitle.interface';

export const SectionTitle: FC<ISectionTitle> = (props): ReactElement => {
  const { text } = props;
  return (
    <Typography variant="subtitle1" mb={1} mt={2}>
      {text}
    </Typography>
  );
};
