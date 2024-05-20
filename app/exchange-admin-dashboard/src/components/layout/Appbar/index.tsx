import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { grey } from '@mui/material/colors';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton
} from '@mui/material';
import { getPageName } from '../../../helpers/helper';
import { AppBarLayout, MenuWrap } from './index.style';


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  handleDrawerOpen?: () => void;
  drawerwidth?: number;
}

export const AppBar = ({
  open,
  drawerwidth,
  handleDrawerOpen,
}: AppBarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const onLogout = () => {
    dispatch.user.logout();
    navigate('/');
  };

  return (
    <AppBarLayout position="fixed" open={open} drawerwidth={drawerwidth}>
      <Toolbar sx={{ height: 90, p: 0, bgcolor: 'background.default' }}>
        <MenuWrap open={open}>
          <img
            src="/assets/images/sidebar.png"
            alt=""
            onClick={handleDrawerOpen}
          />
        </MenuWrap>
        <Box
          px={open ? 2 : 5}
          py={3}
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Typography variant="h1" color="text.primary">
            {getPageName(location.pathname)}
          </Typography>
          <Box display="flex" alignItems="center" gap="16px">
            <Box
              bgcolor="common.white"
              minWidth="40px"
              minHeight="40px"
              display="flex"
            >
              <IconButton onClick={() => onLogout()}>
                <LogoutIcon sx={{ fill: grey[600], margin: 'auto' }} />
              </IconButton>
            </Box>
            <Avatar alt="A B" src="" sx={{ width: 48, height: 48 }}>
              AB
            </Avatar>
          </Box>
        </Box>
      </Toolbar>
    </AppBarLayout>
  );
};
