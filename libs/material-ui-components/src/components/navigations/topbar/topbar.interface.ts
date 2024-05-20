export interface ITopbar {
  pages: { title: string; href: string, type?: string }[];
  seoTitle: string;
  logo: string;
  userData: any;
  handleLogout: () => void;
  onRegistriesClick: () => void,
  onEditUserInfo: () => void,
  onNavigate: (val: any, type?: string) => void
}
