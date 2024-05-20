import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const ThemesWrapper = styled(Box)`
  justify-content: start;
  @media screen and (max-width: 749px) {
    justify-content: center;
  }
`;

export const Title = styled(Typography)`
  font-weight: 700;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 10px;
`;
