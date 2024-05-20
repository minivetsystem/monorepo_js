import { SxProps } from '@mui/material';
import { ReactNode } from 'react';

export interface ICustomButtonProps {
  buttonText: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: string;
  style?: SxProps;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  hrefUrl?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  target?: string;
}

export enum IVariantEnum {
  TEXT = 'text',
  CONTAINED = 'contained',
  OUTLINED = 'outlined',
}
