import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const TableWrap = styled(Box)`
  height: 380px;
  width: 100%;
`;

export const DataGridTable = styled(DataGrid)`
  .MuiDataGrid-columnHeaders {
    background: var(--gray5);
    color: black;
  }
  .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight) > .MuiDataGrid-cell {
    white-space: unset;
    padding: 0 5px;
  }

  .MuiDataGrid-columnHeader--filledGroup {
    .MuiDataGrid-columnHeaderTitleContainer {
      justify-content: center;
      height: 35px;
    }
  }
`;
