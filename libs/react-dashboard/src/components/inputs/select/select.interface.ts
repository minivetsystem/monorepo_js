import { SxProps } from '@mui/material';

export interface IDropdownProps {
  options: string[];
  onChange: (value: string) => void;
  value: string;
  style?: SxProps;
  placeholder?: string;
  error?: boolean;
  label?: string;
  inputRef?: any;
}
