import { SxProps } from '@mui/material';
import { ReactElement } from 'react';

export interface IAccordionProps {
  style?: SxProps;
  summary: ReactElement | string;
  details: ReactElement | string;
  expandIcon?: string;
}
