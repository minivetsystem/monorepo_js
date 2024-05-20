import { ReactNode } from 'react';

export interface IToggleIcons {
  options: { value: string; icon: ReactNode }[];
  onChange: (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => void;
  value: string;
}
