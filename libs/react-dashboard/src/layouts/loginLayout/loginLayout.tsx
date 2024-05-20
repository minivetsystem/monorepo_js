import { FC, ReactElement } from 'react';
import { Grid } from '@mui/material';
import { ILoginLayout } from './loginLayout.interface';
import { LoginImageGrid, LoginContentGrid } from './loginLayout.style';

export const LoginLayout: FC<ILoginLayout> = (props): ReactElement => {
  /* De structure Props */
  const { image = '', loginSidebar = <>Login Sidebar</> } = props;
  return (
    <Grid
      height="100vh"
      display="flex"
      justifyContent="center"
      alignContent="center"
      container
    >
      <LoginImageGrid
        height="100%"
        alignItems="center"
        display="flex"
        justifyContent="center"
        item
        lg={8}
        md={6}
        xs={12}
      >
        <img alt="login" src={image} />
      </LoginImageGrid>
      <LoginContentGrid
        item
        lg={4}
        md={6}
        xs={12}
        p={4}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        sx={{ backgroundColor: 'background.paper' }}
      >
        {loginSidebar}
      </LoginContentGrid>
    </Grid>
  );
};
