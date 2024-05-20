import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const TitleWrapper = styled(Typography)`
  line-height: 28px;
  margin-bottom: 17px;
  @media screen and (max-width: 576px) {
    line-height: 22px;
    margin: 20px 10px;
    font-size: 16px;
  }
`;
