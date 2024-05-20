import { styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';

export const ContainerBox = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
  @media screen and (max-width: 1400px) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const InfoBox = styled(Stack)`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1400px) {
    text-align: center;
  }
`;

export const CircleBox = styled(Box)`
  @media screen and (max-width: 1400px) {
    margin: 10px auto;
  }
`;
