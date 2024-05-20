import React,{ FC, ReactElement } from 'react';
import { Stack } from '@mui/material';

export const SocialIcons: FC = (): ReactElement => {
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-evenly"
      sx={{
        '@media screen and (max-width: 576px)': {
          justifyContent: 'space-between',
        },
        img: {
          cursor: 'pointer',
        },
      }}
    >
      <img src="/images/Instagram.png" alt="instagram" />
      <img src="/images/Facebook.png" alt="facebook" />
      <img src="/images/Twitter.png" alt="twitter" />
    </Stack>
  );
};
