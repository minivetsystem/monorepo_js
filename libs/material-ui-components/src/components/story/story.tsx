import { FC, ReactElement } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import {
  StoryBox,
  StoryText,
  PersonInfo,
  EditIcon,
  DeleteIcon,
} from './story.style';
import { IStoryProps } from './story.interface';

export const Story: FC<IStoryProps> = (props): ReactElement => {
  const {
    data: {
      description,
      title,
      guest: { first_name },
    },
    data,
    setEditData,
    handleDelete,
  } = props;

  const fullName = first_name ?? '';
  const avatarName = first_name.length ? first_name[0] : '';

  return (
    <StoryBox>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5" mb={1}>
          {title}
        </Typography>
        <PersonInfo>
          <Avatar sx={{ mr: 1 }}>{avatarName}</Avatar>
          <Typography
            variant="subtitle2"
            color="var(--black2)"
            fontWeight={700}
          ></Typography>
        </PersonInfo>
      </Box>
      <StoryText variant="subtitle2">{description}</StoryText>
      <Typography mb={1}>~ {fullName}</Typography>
    </StoryBox>
  );
};
