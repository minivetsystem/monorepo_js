import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const CopyrightText = styled(Typography)`
  letter-spacing: 0.02em;
  padding-right: 10px;
  @media screen and (max-width: 991px) {
    padding-left: 0;
  }
  @media screen and (max-width: 576px) {
    font-size: 12px;
  }
`;
