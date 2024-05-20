import React, { FC, ReactElement, useState } from 'react';
import { Menu } from '@monorepo/react-dashboard';
import { Avatar, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IProfileMenu } from './profileMenu.interface';

export const ProfileMenu: FC<IProfileMenu> = (props): ReactElement => {
  const { name, image } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="profilemenu"
        aria-controls={open ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
        size="small"
        endIcon={<ExpandMoreIcon />}
      >
        <Avatar
          sx={{
            width: 24,
            height: 24,
            backgroundColor: 'primary.main',
            marginRight: { xs: '8px', md: '16px' },
            fontSize: '14px',
          }}
          src={image}
          alt={name}
        />
        {name}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        style={{ minWidth: '280px' }}
        items={[
          { label: 'Profile', onClick: handleClose },
          { label: 'My account', onClick: handleClose },
          { label: 'Logout', onClick: handleClose },
        ]}
      />
    </div>
  );
};
