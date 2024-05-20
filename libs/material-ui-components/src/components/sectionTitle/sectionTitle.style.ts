import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const TitleWrapper = styled(Box)`
  line-height: 50px;
  margin-bottom: 30px;
  @media screen and (max-width: 576px) {
    font-size: 24px;
  }
`;
