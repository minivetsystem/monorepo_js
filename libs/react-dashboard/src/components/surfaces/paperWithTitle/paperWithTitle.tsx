import React, { FC, ReactElement } from 'react';
import { Box, Paper } from '@mui/material';
import { IPaperWithTitle } from './paperWithTitle.interface';

export const PaperWithTitle: FC<IPaperWithTitle> = (props): ReactElement => {
  /*Destructure Props */
  const { title = 'Example Title' } = props;

  return (
    <Paper sx={{ width: '100%' }} elevation={0}>
      <Box
        display="flex"
        flexDirection="column"
        sx={{ p: { xs: '20px 8px', sm: '20px' } }}
      >
        {title}
        <Box>{props.children}</Box>
      </Box>
    </Paper>
  );
};
