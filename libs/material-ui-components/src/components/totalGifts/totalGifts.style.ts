import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Gifts = styled(Box)`
  height: 70px;
  @media screen and (max-width: 840px) {
    height: auto;
    padding: 20px 20px;
  }
  @media screen and (max-width: 417px) {
    flex-direction: column;
  }
`;

export const AmountLine = styled(Box)`
  width: 520px;
  @media screen and (max-width: 1234px) {
    width: 350px;
  }
  @media screen and (max-width: 1064px) {
    width: 250px;
  }
  @media screen and (max-width: 992px) {
    width: 200px;
  }
  @media screen and (max-width: 576px) {
    width: 130px;
  }
`;

export const Seperator = styled(Box)`
  @media screen and (max-width: 417px) {
    display: none;
  }
`;
