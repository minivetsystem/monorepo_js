import React, { FC, ReactElement } from 'react';
import { TitleWrapper } from './sectionSubTitle.style';
import { ISectionSubTitleProps } from './sectionSubTitle.interface';

export const SectionSubTitle: FC<ISectionSubTitleProps> = (
  props,
): ReactElement => {
  const { title, style } = props;
  return (
    <TitleWrapper
      variant="h5"
      color="text.primary"
      align="left"
      sx={{ ...style }}
    >
      {title}
    </TitleWrapper>
  );
};
