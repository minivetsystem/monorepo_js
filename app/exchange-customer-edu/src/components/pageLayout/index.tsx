import { FC, ReactElement } from 'react';
import { AppBar, Sidebar } from '@monorepo/react-dashboard';
import { Grid, Box } from '@mui/material';
import { IPageLayout } from './index.interface';
import { links } from '../../mock';

export const PageLayout: FC<IPageLayout> = (props): ReactElement => {
  const { component = <>Main</>, pageName } = props;

  return (
    <Grid container columnSpacing={2}>
      <Grid
        sx={{
          backgroundColor: 'background.paper',
          position: 'relative',
          height: { xs: 'auto', xl: '100vh' },
        }}
        item
        xl={2}
        lg={2.5}
      >
        <Sidebar
          logo="../../assets/images/astoriaLogo.png"
          alt="Astoria Logo"
          links={links}
        />
      </Grid>
      <Grid
        item
        xl={10}
        lg={9.5}
        sx={{
          position: { xs: 'inherit', lg: 'relative' },
          width: '100%',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            right: 10,
            left: { xs: 45, lg: 10 },
          }}
        >
          <AppBar pageName={pageName} />
        </Box>
        <Box
          sx={{
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 86px)',
            marginTop: '86px',
          }}
        >
          {component}
        </Box>
      </Grid>
    </Grid>
  );
};
