import React, { useState } from 'react';
import {
  List,
  Collapse,
  Box,
  ListItemButton,
  ListItemIcon,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { links } from '../../../mock';
import { SideBarContentProps, SelectedIndex } from './index.interface';
import { filter } from 'lodash';

export const Menu = ({ permissions }) => {
  const [selected, setSelected] = useState<SelectedIndex>({
    parentIndex: 1,
    childIndex: 0,
  });

  return (
    <Box sx={{ height: 'calc(100% - 120px)', overflow: 'auto' }}>
      <List sx={{ width: '100%' }} component="nav" disablePadding>
        {links.map((item, index) => {
          if (
            filter(permissions, (permission) => {
              if (item.permissions.indexOf(permission.action) >= 0) {
                return permission;
              }
            }).length > 0
          ) {
            return (
              <MenuList
                key={index}
                {...item}
                selected={selected}
                setSelected={setSelected}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};

const MenuList = ({
  label,
  icon,
  nestedList,
  selected,
  setSelected,
  index,
  route,
}: SideBarContentProps) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = (parentIndex: number) => {
    setOpen(!open);
    setSelected({
      ...selected,
      parentIndex,
      childIndex: undefined,
    });
    if (route) {
      navigate(route);
    }
  };

  const handleNestedClick = (parentIndex: number, childIndex: number) => {
    setSelected({
      ...selected,
      childIndex,
      parentIndex,
    });
    if (nestedList[childIndex].route) {
      navigate(nestedList[childIndex].route);
    }
  };

  return (
    <>
      <ListItemButton
        onClick={() => handleClick(index)}
        sx={{
          width: 232,
          height: 48,
          margin: 'auto',
          backgroundColor:
            selected.parentIndex === index ? 'primary.light' : 'common.white',
          mb: 1,
          borderRadius: 4,
          justifyContent: 'space-between',
        }}
      >
        <Box display="flex">
          {icon ? (
            <ListItemIcon sx={{ minWidth: 36 }}>{icon}</ListItemIcon>
          ) : null}
          <Typography variant="subtitle2">{label}</Typography>
        </Box>
        {nestedList.length ? <ArrowDownIcon sx={{ fill: grey[600] }} /> : null}
      </ListItemButton>
      {nestedList.length ? (
        <Collapse
          in={open && selected.parentIndex === index}
          timeout="auto"
          unmountOnExit
        >
          <List component="div" disablePadding>
            {nestedList.length
              ? nestedList.map((nestedItem: any, i: any) => (
                  <ListItemButton
                    onClick={() => handleNestedClick(index, i)}
                    key={i}
                    sx={{
                      width: 225,
                      height: 48,
                      margin: 'auto 16px 8px 30px',
                      backgroundColor:
                        selected.parentIndex === index &&
                        selected.childIndex === i
                          ? 'primary.light'
                          : 'common.white',
                      borderRadius: 4,
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>{icon}</ListItemIcon>
                    <Typography variant="body1" >{nestedItem.label}</Typography>
                  </ListItemButton>
                ))
              : null}
          </List>
        </Collapse>
      ) : null}
    </>
  );
};
