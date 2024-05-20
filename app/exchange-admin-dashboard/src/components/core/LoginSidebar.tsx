import React, { FC, ReactElement } from 'react';
import { Box, Typography, Alert } from '@mui/material';
import { LoginForm } from '@monorepo/react-dashboard';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/auth/useLogin';

export const LoginSidebar: FC = (): ReactElement => {
  const navigate = useNavigate();
  const {
    mutate: loginUser,
    status: loginStatus,
    error: loginError,
  } = useLogin();

  React.useEffect(() => {
    if (loginStatus === 'success') {
      navigate('/dashboard');
    }
  }, [loginStatus]);

  return (
    <>
      <Box mb={4}>
        <Typography mb={1} component="h1" variant="h2">
          Login
        </Typography>
        <Typography component="p" variant="body1">
          Please login to your account
        </Typography>
      </Box>
      {loginStatus === 'error' &&
        loginError?.map((msg: any, idx: number) => (
          <Alert key={idx} severity="error">
            {msg}
          </Alert>
        ))}
      <LoginForm
        onLogin={(data) => loginUser(data)}
        loginStatus={loginStatus}
      />
    </>
  );
};
