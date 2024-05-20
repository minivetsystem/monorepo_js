import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const PrevNextBox = styled(Box)`
  max-width: 350px;
  background: white;
  height: 72px;
  margin-top: 40px;
  margin-bottom: 27px;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  button {
    width: 104px;
    margin: 12px;
    &.Mui-disabled {
      background: var(--gray5);
      color: var(--gray1);
    }
  }
`;
