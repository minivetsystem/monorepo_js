import { SxProps } from '@mui/material';

export interface IDropdownProps {
  options: { value: string; label: string }[];
  style?: SxProps;
  placeholder?: string;
  value?: string;
  label?: string;
  onChange?: (value: string) => void;
  error?: boolean;
}
