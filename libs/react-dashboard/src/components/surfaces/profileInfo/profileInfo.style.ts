import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ProfileInfoBox = styled(Box)`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 18px;
  justify-content: space-evenly;
  @media screen and (max-width: 1400px) {
    padding: 16px 18px;
  }
`;

export const ActiveLeadBoxContainer = styled(Box)`
  display: flex;
  justify-content: space-evenly;
  @media screen and (max-width: 1400px) {
    flex-wrap: wrap;
    div {
      margin-top: 16px;
    }
  }
`;
