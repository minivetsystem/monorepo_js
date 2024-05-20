import React, { FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import { IGalleryGridProps } from './galleryGrid.interface';
import { Container } from './galleryGrid.style';

export const GalleryGrid: FC<IGalleryGridProps> = (props): ReactElement => {
  const { images } = props;
  return (
    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
      {Array.isArray(images) &&
        images?.map((item, i) => {
          return (
            <Container gridColumn="span 4" key={i}>
              <img src={item} alt="" />
            </Container>
          );
        })}
    </Box>
  );
};
