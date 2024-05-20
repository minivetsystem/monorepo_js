export interface ITotalGifts {
  userName1: string;
  userName2: string;
  totalGiftsAmounts: string;
  registry_id: string;
  showAddGuest?: boolean;
  showEdit?: boolean;
  onNavigate: (val: any) => void;
}
