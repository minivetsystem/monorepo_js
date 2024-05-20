import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const CreateButtonsWrap = styled(Box)`
  justify-content: end;
  margin-bottom: 40px;
  margin-right: 24px;
  @media screen and (max-width: 576px) {
    justify-content: center;
    margin-right: 0px;
    margin-bottom: 0px;
  }
`;
