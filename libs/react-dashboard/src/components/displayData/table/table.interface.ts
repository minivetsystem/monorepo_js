import {
  GridColumns,
  GridValidRowModel,
  DataGridProps,
} from '@mui/x-data-grid';

export interface ITable extends DataGridProps {
  height?: string;
  tableTitle?: string;
}
