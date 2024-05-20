import styled from '@emotion/styled';
import { Stack } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';

export const AppBarLayout = styled(MuiAppBar)<{
  open?: boolean;
  drawerwidth?: number;
}>`
  width: ${({ open, drawerwidth }) =>
    !open ? '100%' : `calc(100% - ${drawerwidth}px)`};
  margin-left: ${({ open, drawerwidth }) =>
    !open ? '0px' : `${drawerwidth}px`};
  box-shadow: none;
`;

export const MenuWrap = styled(Stack)<{ open?: boolean }>`
  display: ${(prop) => (!prop.open ? 'flex' : 'none')};
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;
