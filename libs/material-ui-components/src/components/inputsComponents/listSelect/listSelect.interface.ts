import { SxProps } from '@mui/material';

export interface IListSelect {
  options: { value: string; name: string; title: string; icon: string }[];
  style?: SxProps;
  placeholder?: string;
  value?: string;
  label?: string;
  error?: any;
  setValue?: (value: string) => void;
}
