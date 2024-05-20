import { ReactNode } from 'react';

export interface ILink {
  color?: 'primary' | 'inherit';
  name?: string;
  icon?: ReactNode;
  variant?: 'contained' | 'text';
  href?: string;
  isActive?: boolean;
}

export interface ILinkProps extends ILink {
  children?: ILink[];
}

export interface ILinkButton extends ILinkProps {
  children?: ILink[];
}
