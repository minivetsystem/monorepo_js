import React, { FC, ReactElement } from 'react';
import { Box, ListItem } from '@mui/material';
import {
  InfoWrapper,
  ProfileImage,
  Name,
  LocationData,
} from './aboutPeople.style';
import { IAboutPeople } from './aboutPeople.interface';

export const AboutPeople: FC<IAboutPeople> = (props): ReactElement => {
  const { image, name, location, registry_id, onNavigate, style } = props;

  const handleOnClick = () => {
    registry_id && onNavigate(`/view-registry/${registry_id}`);
  };

  return (
    <ListItem
      onClick={handleOnClick}
      sx={{ cursor: registry_id ? 'pointer' : '' }}
    >
      <InfoWrapper
        sx={style ? style : { backgroundColor: 'background.default' }}
      >
        <ProfileImage src={image}></ProfileImage>
        <Box display="flex" flexDirection="column">
          <Name
            variant="body1"
            color={style ? style.color : 'Background.paper'}
          >
            {name}
          </Name>
          <Box display="flex" alignItems="baseline">
            <img
              src="/images/location.png"
              alt={location}
              style={{ marginRight: '8.69px' }}
            />
            <LocationData
              variant="body2"
              color="text.disabled"
              width={190}
              lineHeight="20px"
            >
              {location}
            </LocationData>
          </Box>
        </Box>
      </InfoWrapper>
    </ListItem>
  );
};
