import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

export const ImagesWrap = styled(Stack)`
  position: relative;
  width: 100%;
  margin-top: 60px;
  button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media screen and (max-width: 576px) {
    margin-top: 25px;
    button {
      line-height: 15px;
    }
  }
`;
