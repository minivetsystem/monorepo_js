import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const InnerWrap = styled(Box)`
  box-shadow: 0px 4px 8px rgba(24, 44, 69, 0.05);
  border-radius: 8px;
  margin: 30px auto;
  min-height: 584px;
  @media screen and (max-width: 1000px) {
    margin-left: 15px;
    margin-right: 15px;
  }
`;
