import { DataGridProps } from '@mui/x-data-grid';

export interface ITable extends DataGridProps {
  height?: string;
  tableTitle?: string;
  description?: string;
  filterOptions?: any;
  selectedFilters?: any;
  showFilterPanel?: boolean;
  onFetchReport: any;
  onFilterOptionChange: (ev: any, prop: any) => void;
  onFilterValueChange: (ev: any, prop: any) => void;
  onFilterTextChange: (e:any, prop:any) => void;
  onFilterColumnChange: (ev: any,) => void;
  onFilterOperatorChange: (ev: any, prop: any) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  handleClickOpen: () => void;
  onRemoveFilter: (val: string) => void;
  startDate?: string;
  noOfRows?: number;
  isFetching?: boolean;
  lastUpdate?:string;
  isGoBtnClicked?:boolean;
  error?:any
}

export interface IFilterPanel {
  selectedFilters?: any;
  selectedFilter?: any;
  onFilterColumnChange: (ev: any) => void;
  onFilterOperatorChange: (ev: any, prop: any) => void;
  onFilterValueChange: (ev: any, prop: any) => void;
  onFilterOptionChange: (ev: any, prop: any) => void;
  onFilterTextChange: (e:any, prop:any) => void;
  filterOptions?: any;
  resetProgress?: any;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  onRemoveFilter: (val: string) => void;
  hideControls?: boolean;
  isGoBtnClicked?: boolean;
  error?:any;
}
