import { SxProps } from '@mui/material';

export interface IToggleSelects {
  options: (string )[];
  onChange: (value: string) => void;
  value: string;
  style?: SxProps;
  label?: string;
}
