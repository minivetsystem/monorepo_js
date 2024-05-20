export interface IMenuProps {
  pages: { title: string; href: string, type?: string }[];
  onNavigate: (val: any, type?: string) => void;
}
