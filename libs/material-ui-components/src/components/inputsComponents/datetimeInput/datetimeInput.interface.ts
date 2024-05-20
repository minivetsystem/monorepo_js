import { SxProps } from '@mui/material';
import { Moment } from 'moment';

export interface IDateTimeInput {
  name?: string;
  value: Moment;
  onChange: (value: any) => void;
  label?: string;
  style?: SxProps;
  inputRef?: any;
  error?: boolean;
  disableFuture?: boolean;
  minDate?:any;
  slotProps?: any;
  borderStyle?: any;
}
