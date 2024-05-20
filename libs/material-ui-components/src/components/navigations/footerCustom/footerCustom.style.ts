import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

export const FooterWrap = styled(Grid)`
  @media screen and (max-width: 600px) {
    justify-content: center;
  }
  .MuiStack-root {
    margin: 0px;
    h5 {
      margin-right: 16px;
    }
  }
  h6 {
    margin-left: 0px;
  }
`;

export const FooterLogo = styled(Grid)`
  img {
    width: 150px;
    height: 20px;
    padding: 0px 40px;
    @media screen and (max-width: 991px) {
      margin-left: 25px;
      padding-left: 0px;
    }
    @media screen and (max-width: 600px) {
      margin-bottom: 10px;
      margin-left: 20px;
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
