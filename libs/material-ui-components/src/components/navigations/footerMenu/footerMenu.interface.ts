export interface IFooterMenuProps {
  footerMenu: { menu: string; subMenu?: string[]; href?: string; }[];
  onNavigate: (val: any) => void;
}
