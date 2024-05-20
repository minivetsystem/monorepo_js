import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const TableContainer = styled(Box)<{ height?: string }>`
  width: 100%;
  height: ${({ height }) => height};
  margin-bottom: 20px;
  .MuiDataGrid-root {
    .MuiDataGrid-columnHeaderTitleContainer,.MuiDataGrid-columnHeaderTitle{
      font-weight: 600 !important;
    }
    font-size: 16px;
    font-family: 'Helvetica';
    border: none;
    box-shadow: 0px 4px 8px rgba(24, 44, 69, 0.05);
    .MuiDataGrid-columnSeparator {
      display: none;
    }
    .MuiCheckbox-root {
      color: var(--gray7);
      &.Mui-checked {
        svg {
          fill: var(--purple1);
        }
      }
    }
    .MuiDataGrid-row,
    .MuiDataGrid-cell {
      max-height: 68px !important;
      height: 68px;
    }
    .MuiDataGrid-columnHeaders {
      border: none;
    }
    .MuiDataGrid-footerContainer {
      display: none;
    }
  }
`;
