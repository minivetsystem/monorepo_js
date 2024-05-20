import { styled } from '@mui/material/styles';
import { Box, Drawer, IconButton } from '@mui/material';

export const SidebarSection = styled(Box)`
  max-width: inherit;
  width: 100%;
  .MuiPaper-root {
    border-right: none;
  }
`;

export const DesktopDrawer = styled(Box)`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1199px) {
    display: none;
  }
`;

export const TabletDrawer = styled(Drawer)``;

export const BurgerIconButton = styled(IconButton)`
  background: white;
  margin: 12px;
`;
