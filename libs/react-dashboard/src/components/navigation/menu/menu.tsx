import React, { ReactElement, FC } from 'react';
import { Menu as MenuList, MenuItem } from '@mui/material';
import { IMenu } from './menu.interface';

export const Menu: FC<IMenu> = (props): ReactElement => {
  const { open, anchorEl, items, handleClose, style } = props;

  return (
    <MenuList
      id="menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      sx={style}
    >
      {Array.isArray(items) &&
        items.map((item, index) => (
          <MenuItem onClick={item.onClick} key={index}>
            {item.label}
          </MenuItem>
        ))}
    </MenuList>
  );
};
