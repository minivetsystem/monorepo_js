export interface IAboutPeople {
  image: string | undefined;
  name: string;
  location: string;
  registry_id?: string;
  onNavigate: (val: any) => void;
  style?: any;
}
