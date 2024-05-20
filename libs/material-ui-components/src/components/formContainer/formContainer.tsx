import React, { FC, ReactElement, PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import { FormWrap } from './formContainer.style';

export const FormContainer: FC<PropsWithChildren> = (props): ReactElement => {
  const { children } = props;
  return (
    <Box py={5}>
      <FormWrap>{children}</FormWrap>
    </Box>
  );
};
