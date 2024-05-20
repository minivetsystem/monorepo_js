import { SxProps } from '@mui/material';

export interface IMenu {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  style?: SxProps;
  items: {
    label: string;
    onClick?: () => void;
  }[];
}
