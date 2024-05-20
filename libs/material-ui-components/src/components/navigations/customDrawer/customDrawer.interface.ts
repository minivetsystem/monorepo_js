export interface ICustomDrawer {
  anchor: Anchor;
  open: boolean;
  onClose: () => void;
}

export type Anchor = 'top' | 'left' | 'bottom' | 'right';
