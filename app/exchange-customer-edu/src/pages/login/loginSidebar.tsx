import React, { FC, ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { LoginForm } from '@monorepo/react-dashboard';

export const LoginSidebar: FC = (): ReactElement => {
  return (
    <>
      <Box textAlign="center" display="flex w-100">
        <Typography
          variant="h1"
          component="h1"
          mb={4}
          sx={{ color: 'text.secondary', fontWeight: 400 }}
        >
          Best
          <span style={{ color: '#7E22CE', fontWeight: 700 }}>Insurance</span>
          Leads
        </Typography>
      </Box>
      <Box mb={4}>
        <Typography mb={1} component="h1" variant="h2">
          Login
        </Typography>
        <Typography component="p" variant="body1">
          Please login to your account
        </Typography>
      </Box>
      <LoginForm />
    </>
  );
};
