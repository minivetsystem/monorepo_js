import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

export const LoginImageGrid = styled(Grid)`
  img {
    width: auto;
    height: auto;
    @media screen and (max-width: 1200px) {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  @media screen and (max-width: 900px) {
    height: 30%;
  }
`;

export const LoginContentGrid = styled(Grid)`
  @media screen and (max-width: 900px) {
    height: 70%;
    .MuiTypography-h2,
    .MuiTypography-body1 {
      text-align: center;
    }
  }
  @media screen and (max-width: 500px) {
    padding: 15px;
  }
`;
