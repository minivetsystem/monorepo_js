import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

export const ImageList = styled(Stack)`
  @media screen and (max-width: 576px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: unset;
    li {
      width: 50%;
    }
  }
`;
