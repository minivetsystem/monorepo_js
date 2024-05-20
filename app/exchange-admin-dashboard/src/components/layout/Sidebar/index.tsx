import React from 'react';
import { Box, Drawer } from '@mui/material';
import { Menu } from '../Menu';
import { SidebarProps } from './index.interface';
import { useSelector } from 'react-redux';

export const Sidebar = ({ drawerwidth, open }: SidebarProps) => {
  const userState = useSelector((state: any) => state.user);

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        background: 'white',
        '.MuiDrawer-paper': {
          border: 'none',
          width: drawerwidth,
        },
      }}
    >
      <Box display="flex" p={3}>
        <img src="/assets/images/astoriaLogo.png" alt="" />
      </Box>
      <Menu permissions={userState.user.role.permissions} />
    </Drawer>
  );
};
