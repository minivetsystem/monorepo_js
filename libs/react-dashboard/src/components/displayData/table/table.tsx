import React, { FC, ReactElement } from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { TableWrap, DataGridTable } from './table.style';
import { ITable } from './table.interface';

export const Table: FC<ITable> = (props): ReactElement => {
  const { tableTitle, height, ...rest } = props;
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        width: '100%',
        padding: '10px',
        flexDirection: 'column',
        zIndex: 1,
      }}
    >
      <Box
        mb={1}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h5">{tableTitle}</Typography>
        </Box>
      </Box>
      <TableWrap sx={{ height: height ?? 380, width: '100%' }}>
        <DataGridTable {...rest} />
      </TableWrap>
    </Paper>
  );
};
