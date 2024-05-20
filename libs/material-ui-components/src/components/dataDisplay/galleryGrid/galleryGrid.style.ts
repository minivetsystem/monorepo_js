import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const Container = styled(Box)`
  max-height: 500px;
  padding: 16px;
  display: flex;
  justify-content: center;
  background: var(--gray4);
  img {
    max-width: 100%;
    display: block;
    margin: auto;
    max-height: 400px;
  }
`;
