import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const NavbarContainer = styled(Box)`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 992px) {
    justify-content: space-between;
  }
  @media screen and (max-width: 600px) {
    height: 70px;
  }
`;
