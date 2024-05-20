import React, { FC, ReactElement, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Menu,
  Fade,
  MenuItem,
  Link,
} from '@mui/material';
import { CustomButton } from '../inputsComponents/customButton/customButton';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { IRightSectionProps } from './rightSection.interface';

export const RightSection: FC<IRightSectionProps> = (props): ReactElement => {
  const {
    userData,
    handleLogout,
    onRegistriesClick,
    onEditUserInfo,
    onNavigate,
  } = props;
  const isLogged = !!userData?.accessToken;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    handleClose();
    return () => {
      handleClose();
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRegistriesClick = () => {
    handleClose();
    onRegistriesClick();
  };

  const handleEditUserInfo = () => {
    handleClose();
    onEditUserInfo();
  };

  const handleLogoutAction = () => {
    setAnchorEl(null);
    handleLogout();
  };

  return (
    <>
      {isLogged ? (
        <Box display="flex" alignItems="center">
          <Box display="flex" onClick={handleClick}>
            <Box
              mr={1.2}
              height="42px"
              sx={{ display: { xs: 'none', sm: 'block', cursor: 'pointer' } }}
            >
              <Typography variant="subtitle1" fontWeight={700}>
                {userData?.first_name + ' ' + userData?.last_name}
              </Typography>
              <Typography variant="body2" lineHeight={1} color="#4F4F4F">
                {userData?.email}
              </Typography>
            </Box>
            <Avatar
              alt={userData?.first_name + ' ' + userData?.last_name}
              src=""
              sx={{ width: 42, height: 42, cursor: 'pointer', mr: 1.2 }}
            />
          </Box>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            sx={{
              mt: 1,
              ul: {
                padding: 0,
              },
            }}
          >
            <MenuItem onClick={handleRegistriesClick}>Registries</MenuItem>
            <MenuItem onClick={handleEditUserInfo}>Edit User</MenuItem>
            <MenuItem onClick={handleLogoutAction}>Logout</MenuItem>
          </Menu>
        </Box>
      ) : (
        <div>
          <Box
            sx={{
              alignItems: 'center',
              display: {
                xs: 'none',
                md: 'flex',
              },
            }}
          >
            <Link onClick={() => onNavigate('/signin')}>
              <CustomButton
                variant="outlined"
                buttonText="Log In"
                style={{ height: '46px' }}
              />
            </Link>
            <Link onClick={() => onNavigate('/signup')}>
              <CustomButton
                variant="contained"
                buttonText="Sign Up"
                style={{ height: '46px', ml: 2 }}
              />
            </Link>
          </Box>
          <Box
            sx={{
              alignItems: 'center',
              display: {
                xs: 'flex',
                md: 'none',
                justifyContent: 'space-between',
              },
            }}
          >
            <Link onClick={() => onNavigate('/signin')}>
              <LoginIcon sx={{ color: 'text.secondary', ml: 1, mr: 1 }} />
            </Link>
            <Link onClick={() => onNavigate('/signup')}>
              <AppRegistrationIcon
                sx={{ color: 'text.secondary', ml: 1, mr: 2 }}
              />
            </Link>
          </Box>
        </div>
      )}
    </>
  );
};
