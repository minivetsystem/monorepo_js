import React, { FC, ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { CustomButton } from '../../../index';
import {
  CardCotainer,
  CardActionSection,
  CardContentSection,
  ImageContainer,
} from './card.style';
import { ICard } from './card.interface';

export const CardComponent: FC<ICard> = (props): ReactElement => {
  const { image, title, description } = props;
  return (
    <Box>
      <CardCotainer>
        <ImageContainer>
          <img src={image} alt="Logo" />
        </ImageContainer>
        <CardContentSection>
          <Typography gutterBottom variant="h4">
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            {description}
          </Typography>
        </CardContentSection>
        <CardActionSection>
          {/* <CustomButton
            buttonText="Learn More"
            endIcon={<img src="/images/Vector.png" alt="" />}
            hrefUrl="/"
          /> */}
        </CardActionSection>
      </CardCotainer>
    </Box>
  );
};
