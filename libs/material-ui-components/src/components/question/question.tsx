import React, { FC, ReactElement } from 'react';
import { ListItem, Typography } from '@mui/material';
import { Accordion } from '../../index';
import { QuestionBox } from './question.style';
import { IQuestionProps } from './question.interface';

export const Question: FC<IQuestionProps> = (props): ReactElement => {
  const { question, answer } = props;
  return (
    <ListItem sx={{ bgcolor: 'info.main', mb: '15px', borderRadius: '8px' }}>
      <QuestionBox>
        <Accordion
          expandIcon="/images/circleplus.png"
          style={{
            boxShadow: 'none',
            border: 'none',
            bgcolor: 'info.main',
            padding: '0px',
          }}
          summary={<Typography sx={{ fontWeight: 700 }}>{question}</Typography>}
          details={<Typography>{answer}</Typography>}
        />
      </QuestionBox>
    </ListItem>
  );
};
