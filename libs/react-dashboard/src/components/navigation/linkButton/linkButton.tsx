import React, { FC, ReactElement, useState } from 'react';
import { Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import {
  AccordionSummaryBox,
  AccordionItem,
  NavLink,
  ChildMenu,
  AccordionDetailsBox,
} from './linkButton.style';
import { ILinkButton } from './linkButton.interface';

export const LinkButton: FC<ILinkButton> = (props): ReactElement => {
  // Destructure props
  const [expanded, setExpanded] = useState<boolean>(false);

  const {
    name = 'name',
    icon = <DashboardOutlinedIcon />,
    variant = 'contained',
    href = '/',
    isActive = false,
    children = [],
  } = props;

  const handleOpen = () => {
    setExpanded(true);
  };

  const handleClose = () => {
    setExpanded(false);
  };

  return (
    <Box
      display="flex"
      alignSelf="stretch"
      justifyContent="flex-start"
      maxWidth={500}
    >
      <AccordionItem
        onMouseOver={handleOpen}
        onMouseOut={handleClose}
        expanded={expanded}
        // sx={{ backgroundColor: isActive ? 'var(--main)' : 'var(--gray4)' }}
      >
        <AccordionSummaryBox
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <NavLink
            // href={href}
            startIcon={icon}
            disableElevation
            fullWidth
            size="large"
            color="inherit"
            variant="text"
          >
            {name}
          </NavLink>
        </AccordionSummaryBox>
        <AccordionDetailsBox>
          {children?.length > 0 ? (
            <ChildMenu>
              {children?.map((item) => (
                <NavLink
                  href={item.href}
                  startIcon={item.icon}
                  variant="text"
                  disableElevation
                  fullWidth
                  color="inherit"
                  sx={{ justifyContent: 'start' }}
                >
                  {item.name}
                </NavLink>
              ))}
            </ChildMenu>
          ) : (
            ''
          )}
        </AccordionDetailsBox>
      </AccordionItem>
    </Box>
  );
};
