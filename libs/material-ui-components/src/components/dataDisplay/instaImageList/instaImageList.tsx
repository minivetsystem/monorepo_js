import React, { FC, ReactElement } from 'react';
import { InstaImage } from '../../../index';
import { IInstaImageListProps } from './instaImageList.interface';
import { ImageList } from './instaImageList.style';

export const InstaImageList: FC<IInstaImageListProps> = (
  props,
): ReactElement => {
  const { instaImages } = props;
  return (
    <ImageList flexDirection="row" justifyContent="center" overflow="auto">
      {Array.isArray(instaImages) &&
        instaImages?.map((item, index) => (
          <InstaImage image={item} key={index} />
        ))}
    </ImageList>
  );
};
