import { SxProps } from '@mui/material';

export interface ICustomTextField {
  label: string;
  style?: SxProps;
  placeholder?: string;
  startAdornment?: any;
  error?: any;
  type?: string;
  helperText?: string;
  onChange?: (val: any) => void;
}