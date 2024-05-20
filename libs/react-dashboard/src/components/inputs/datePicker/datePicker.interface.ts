import { SxProps } from '@mui/material';
import { Moment } from 'moment';

export interface IDatePicker {
  onChange: (value: any) => void;
  value: Moment;
  style?: SxProps;
  label?: string;
  inputRef?: any;
}
