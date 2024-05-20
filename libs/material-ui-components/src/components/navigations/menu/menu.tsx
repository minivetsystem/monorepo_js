import React, { FC, ReactElement, useState } from 'react';
import {
  Box,
  IconButton,
  Typography,
  Menu as ItemMenu,
  MenuItem,
  Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuBar } from './menu.style';
import { IMenuProps } from './menu.interface';

export const Menu: FC<IMenuProps> = (props): ReactElement => {
  const { pages, onNavigate } = props;
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <MenuBar
        sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}
      >
        {Array.isArray(pages) &&
          pages?.map((page, index) => (
            <Link onClick={() => onNavigate(page.href, page.type)} key={index}>
              <Typography
                sx={{ cursor: 'pointer' }}
                textAlign="right"
                variant="subtitle1"
                color="text.primary"
              >
                {page.title}
              </Typography>
            </Link>
          ))}
      </MenuBar>
      <Box
        sx={{
          alignItems: 'center',
          display: { xs: 'flex', md: 'none', justifyContent: 'space-between' },
          position: 'absolute',
        }}
      >
        <IconButton
          size="large"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <ItemMenu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {Array.isArray(pages) &&
            pages?.map((page, index) => (
              <MenuItem onClick={handleCloseNavMenu} key={index}>
                <Link href={page.href}>
                  <Typography
                    textAlign="right"
                    variant="subtitle1"
                    color="text.primary"
                  >
                    {page.title}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
        </ItemMenu>
      </Box>
    </>
  );
};
