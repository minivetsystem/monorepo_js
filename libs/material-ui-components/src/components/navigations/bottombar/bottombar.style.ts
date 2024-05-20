import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

export const FooterWrap = styled(Grid)`
  @media screen and (max-width: 576px) {
    margin-top: 20px;
  }
`;

export const FooterLogo = styled(Grid)`
  img {
    width: 150px;
    height: 20px;
    padding: 10px 90px;
    @media screen and (max-width: 991px) {
      margin-left: 25px;
      padding-left: 0px;
    }
    @media screen and (max-width: 576px) {
      margin-left: 10px;
    }
  }
`;

export const CopyrightWrap = styled(Grid)`
  @media screen and (max-width: 991px) {
    margin-bottom: 32px;
  }
  @media screen and (max-width: 576px) {
    margin-bottom: 24px;
    padding-right: 10px;
  }
`;
