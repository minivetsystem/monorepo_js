import { DataGridProps } from '@mui/x-data-grid';

export interface ITable extends DataGridProps {
  height?: string;
  emptyMessage?: string;
}
