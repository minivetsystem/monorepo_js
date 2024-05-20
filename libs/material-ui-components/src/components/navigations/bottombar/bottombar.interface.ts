export interface IBottombar {
  footerMenu: { menu: string; subMenu: string[] }[];
  footerLogo: string;
  copyrightText: string;
  onNavigate: (val: any) => void;
}
