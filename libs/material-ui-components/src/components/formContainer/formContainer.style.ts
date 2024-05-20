import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const FormWrap = styled(Box)`
  max-width: 482px;
  margin: auto;
  background: white;
  @media screen and (max-width: 1024px) {
    margin: 30px auto;
  }
  box-shadow: 0px 4px 14px rgba(24, 44, 69, 0.05);
  border-radius: 8px;
`;
