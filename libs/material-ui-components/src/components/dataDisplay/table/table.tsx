import React, { ReactElement, FC } from 'react';
import { Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ITable } from './table.interface';
import { TableContainer } from './table.style';

export const Table: FC<ITable> = (props): ReactElement => {
  const { height, emptyMessage, ...rest } = props;

  function NoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        {emptyMessage ?? 'No data found'}
      </Stack>
    );
  }

  return (
    <TableContainer height={height ?? '340px'}>
      <DataGrid {...rest} components={{ NoRowsOverlay }} />
    </TableContainer>
  );
};
