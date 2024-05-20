import React, { FC, ReactElement } from 'react';
import { Box, InputAdornment } from '@mui/material';
import {
  CustomTextField,
  CustomButton,
} from '@monorepo/material-ui-components';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { ILoginForm } from './loginForm.interface';

export const LoginForm: FC<ILoginForm> = ({
  onLogin,
  loginStatus,
}): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
  });

  const handleFormSubmit: SubmitHandler<any> = (data) => {
    onLogin(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Box display="flex" flexDirection="column">
        <Controller
          name="username"
          control={control}
          rules={{
            required: 'Username is required.',
          }}
          render={({ field: { onChange, value, ref } }) => (
            <CustomTextField
              label="Username"
              placeholder="Enter username"
              error={!!errors.username}
              style={{ mb: 4 }}
              onChange={(e) => onChange(e.target.value)}
              helperText={errors?.username?.message}
              startAdornment={
                <InputAdornment position="start">
                  <Box pl={1}>
                    <img src="/assets/images/message.svg" alt="" />
                  </Box>
                </InputAdornment>
              }
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: 'Password is required.' }}
          render={({ field: { onChange, value, ref } }) => (
            <CustomTextField
              label="Password"
              placeholder="Enter password"
              type="password"
              style={{ mb: 4 }}
              error={!!errors.password}
              onChange={(e) => onChange(e.target.value)}
              helperText={errors?.password?.message}
              startAdornment={
                <InputAdornment position="start">
                  <Box pl={1}>
                    <img src="/assets/images/lock.svg" alt="" />
                  </Box>
                </InputAdornment>
              }
            />
          )}
        />
        <Box my={3}>
          <CustomButton
            buttonText={loginStatus === 'loading' ? 'Signing in...' : 'Sign In'}
            variant="contained"
            color="success"
            type="submit"
            style={{ textDecoration: 'none', width: '100%' }}
          />
        </Box>
      </Box>
    </form>
  );
};
