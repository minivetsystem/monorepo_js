import { ReactNode } from 'react';

export interface ISidebar {
  logo: string;
  alt: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  links: {
    name: string;
    icon?: ReactNode;
    color?: 'primary' | 'inherit';
    variant?: 'contained' | 'text';
  }[];
}
