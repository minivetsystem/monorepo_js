import { ReactNode } from 'react';

export interface ICard {
  image: string;
  title: string;
  description: string;
  cardActionSection?: ReactNode;
}
