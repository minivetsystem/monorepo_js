import React, { FC, ReactElement } from 'react';
import { List, Box } from '@mui/material';
import { Question } from '../../index';
import { IQuestionListProps } from './questionList.interface';

export const QuestionList: FC<IQuestionListProps> = (props): ReactElement => {
  const { questions } = props;
  return (
    <Box
      sx={{
        '@media screen and (max-width: 756px)': {
          margin: '0px 10px',
        },
      }}
    >
      <List sx={{ p: 0 }}>
        {Array.isArray(questions) &&
          questions?.map((item, index) => (
            <Question
              question={item.question}
              answer={item.answer}
              key={index}
            />
          ))}
      </List>
    </Box>
  );
};
