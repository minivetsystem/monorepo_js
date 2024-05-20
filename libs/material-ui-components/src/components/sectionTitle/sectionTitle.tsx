import React, { FC, ReactElement } from 'react';
import { Typography } from '@mui/material';
import { TitleWrapper } from './sectionTitle.style';
import { ISectionTitleProps } from './sectionTitle.interface';

export const SectionTitle: FC<ISectionTitleProps> = (props): ReactElement => {
  const { title, style, wrapperStyle } = props;
  return (
    <TitleWrapper sx={wrapperStyle}>
      <Typography variant="h3" color="text.primary" align="center" sx={style}>
        {title}
      </Typography>
    </TitleWrapper>
  );
};
