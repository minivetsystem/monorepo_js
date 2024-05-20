import { PropsWithChildren, ReactNode } from 'react';

export interface IPaperWithTitle extends PropsWithChildren {
  title?: ReactNode;
}
