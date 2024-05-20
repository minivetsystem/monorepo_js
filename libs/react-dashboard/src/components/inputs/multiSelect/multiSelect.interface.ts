import { SxProps } from '@mui/material';

export interface IDropdownProps {
  options: string[];
  style?: SxProps;
  placeholder?: string;
  onChange: (values: string[]) => void;
  value: string[];
  onBlur?: () => void;
}
