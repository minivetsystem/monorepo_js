import { SxProps } from '@mui/material';

export interface MListSelect {
  options?: { value: string; name: string }[]; // Marking options as optional
  style?: SxProps;
  placeholder?: string;
  value: string | string[];
  setValue?: (value: string | string[]) => void;
  label: string;
  error?: { message: string };
  multiple?: boolean;
  inputRef?: React.Ref<any>;
}