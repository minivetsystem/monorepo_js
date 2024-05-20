import { styled } from '@mui/material/styles';
import { Box, Avatar, Typography } from '@mui/material';

export const InfoWrapper = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 380px;
  height: 120px;
  border-radius: 8px;
  margin-bottom: 25px;
  @media screen and (max-width: 1200px) {
    width: 335px;
  }
  @media screen and (max-width: 576px) {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
  }
`;

export const ProfileImage = styled(Avatar)`
  margin: 25px 18.31px 25px 30px;
  width: 70px;
  height: 70px;
  @media screen and (max-width: 576px) {
    margin: 10px;
  }
`;

export const Name = styled(Typography)`
  line-height: 28px;
  font-weight: 700;
`;

export const LocationData = styled(Typography)`
  @media screen and (max-width: 576px) {
    width: 200px;
  }
  @media screen and (max-width: 350px) {
    width: 160px;
  }
`;
