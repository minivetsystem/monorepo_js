import React, { useState, PropsWithChildren, useEffect } from 'react';
import { Box, Stack } from '@mui/material';
import { AppBar } from './Appbar';
import { Sidebar } from './Sidebar';
import { useSelector, useDispatch } from 'react-redux';

export const Layout = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.transferlist);

  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch.transferlist.ToggleButton(!userState.data);
  };

  useEffect(() => {
    if (window?.innerWidth < 1300) {
      setOpen(false);
    }
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        overflow: 'hidden',
        display: 'flex',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      {open && (
        <img
          src="/assets/images/sidebar.png"
          alt=""
          onClick={handleDrawerToggle}
          style={{ position: 'absolute', left: 266, top: 32, zIndex: 1250 }}
        />
      )}
      <AppBar
        position="fixed"
        open={open}
        handleDrawerOpen={handleDrawerToggle}
        drawerwidth={280}
      />
      <Sidebar open={open} drawerwidth={280} />
      <main
        style={{
          marginLeft: !open ? '0px' : '280px',
          padding: '0px 40px',
          width: open ? 'calc(100% - 280px)' : '100%',
        }}
      >
        <Stack sx={{ height: 90 }} />
        <Box sx={{ height: 'calc(100% - 90px)', width: 'calc(100% - 10px)' }}>
          {children}
        </Box>
      </main>
    </Box>
  );
};
