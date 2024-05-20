import React, { FC, ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { ProfileMenu } from '@monorepo/react-dashboard';
import { ITopNavbar } from './appBar.interface';

export const AppBar: FC<ITopNavbar> = (props): ReactElement => {
  const { pageName } = props;
  return (
    <Box
      display="flex"
      alignContent="center"
      justifyContent="space-between"
      flexDirection="row"
      p={2}
      sx={{ padding: '14px' }}
    >
      <Box display="flex">
        <Typography component="h1" variant="h2">
          {pageName}
        </Typography>
      </Box>
      <Box display="flex">
        <ProfileMenu image="" name="EV" />
      </Box>
    </Box>
  );
};
