import React, { FC, ReactElement, useState } from 'react';
import { Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { LinkButton } from '@monorepo/react-dashboard';
import { ISidebar } from './sidebar.interface';
import {
  SidebarSection,
  TabletDrawer,
  BurgerIconButton,
} from './sidebar.style';

export const Sidebar: FC<ISidebar> = (props): ReactElement => {
  // Destructure props
  const { logo, links, alt } = props;
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const drawerContent = (
    <Box px={1} py={3}>
      <CloseIcon
        onClick={handleDrawerToggle}
        sx={{ float: 'right', mt: 1.2, mr: 1.2 }}
      />

      <Box mb={4}>
        <img alt={alt} src={logo} />
      </Box>

      {Array.isArray(links) &&
        links?.map((item, index) => <LinkButton {...item} key={index} />)}
    </Box>
  );

  return (
    <SidebarSection>
      <BurgerIconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </BurgerIconButton>
      {/* <DesktopDrawer>{drawerContent}</DesktopDrawer> */}

      <TabletDrawer
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawerContent}
      </TabletDrawer>
    </SidebarSection>
  );
};
