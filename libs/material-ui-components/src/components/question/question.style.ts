import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const QuestionBox = styled(Box)`
  width: 688px;
  display: flex;
  justify-content: space-between;
  line-height: 34px;
  @media screen and (max-width: 756px) {
    width: 100%;
    font-size: 16px;
    margin-right: 10px;
  }
`;
