import React, { FC, ReactElement } from 'react';
import { Paper, Avatar, Box, Typography } from '@mui/material';
import { IProfile } from './profileInfo.interface';
import { ProfileInfoBox, ActiveLeadBoxContainer } from './profileInfo.style';

export const ProfileInfo: FC<IProfile> = (props): ReactElement => {
  const { image, name, userId, data } = props;
  return (
    <Paper sx={{ width: '100%', display: 'flex' }} elevation={0}>
      <ProfileInfoBox>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'primary.main',
              marginBottom: '8px',
            }}
            src={image}
            alt={name}
          />
          <Typography variant="h5">{name}</Typography>
          <Typography variant="body2">User ID: {`${userId}`}</Typography>
        </Box>
        <Box my={4} display="flex" flexDirection="column" alignItems="center">
          <Typography sx={{ color: 'info.main' }} variant="h1">
            {data[0]?.value}
          </Typography>
          <Typography variant="caption">{data[0]?.name}</Typography>
        </Box>
        <ActiveLeadBoxContainer>
          <Box
            display="flex"
            width={100}
            flexDirection="column"
            alignItems="center"
            sx={{ textAlign: 'center' }}
            mx={2}
          >
            <Typography sx={{ color: 'grey.light' }} variant="h4">
              {data[1]?.value}
            </Typography>
            <Typography variant="body2">{data[1]?.name}</Typography>
          </Box>
          <Box
            display="flex"
            width={100}
            flexDirection="column"
            alignItems="center"
            sx={{ textAlign: 'center' }}
            mx={2}
          >
            <Typography sx={{ color: 'grey.light' }} variant="h4">
              {data[2]?.value}
            </Typography>
            <Typography variant="body2">{data[2]?.name}</Typography>
          </Box>
        </ActiveLeadBoxContainer>
      </ProfileInfoBox>
    </Paper>
  );
};
