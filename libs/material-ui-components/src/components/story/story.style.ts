import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import DeleteSvg from '@mui/icons-material/Delete';
import EditSvg from '@mui/icons-material/Edit';

export const StoryBox = styled(Box)`
  width: 525px;
  height: fit-content;
  border: 1px solid var(--gray2);
  border-radius: 8px;
  padding: 30px;
  background-color: white;
  margin-bottom: 30px;
  @media screen and (max-width: 1300px) {
    width: 490px;
  }
  @media screen and (max-width: 1150px) {
    width: 380px;
  }
  @media screen and (max-width: 960px) {
    width: 350px;
  }
  @media screen and (max-width: 450px) {
    width: 270px;
    padding: 15px;
  }
`;

export const StoryText = styled(Typography)`
  color: var(--gray3);
  letter-spacing: 0.02em;
  line-height: 26px;
  margin-bottom: 20px;
  word-break: break-word;
`;

export const ImageWrapper = styled(Box)`
  img {
    width: 30px;
    height: 30px;
    margin-right: 16px;
  }
`;

export const PersonInfo = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const DeleteIcon = styled(DeleteSvg)`
  fill: #f16767;
  cursor: pointer;
`;

export const EditIcon = styled(EditSvg)`
  fill: var(--purple1);
  margin-right: 10px;
  cursor: pointer;
`;
