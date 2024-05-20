import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

export const FooterMenuWrap = styled(Stack)`
  justify-content: space-evenly;
  h5 {
    line-height: 26px;
    margin-bottom: 15px;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.02em;
  }
  h6 {
    line-height: 34px;
    letter-spacing: 0.02em;
  }
  flex-wrap: wrap;
  // @media screen and (max-width: 991px) {
  //   justify-content: center;
  //   div {
  //     margin: 10px;
  //   }
  // }
  // @media screen and (max-width: 576px) {
  //   justify-content: left;
  //   margin-left: 10px;
  // }
`;
