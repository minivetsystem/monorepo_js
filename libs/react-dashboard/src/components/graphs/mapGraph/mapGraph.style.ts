import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const MapWrapper = styled(Box)`
  max-width: 500px;
  g {
    g {
      display: none;
    }
  }
  @media screen and (max-width: 576px) {
    max-width: 300px;
  }
`;
