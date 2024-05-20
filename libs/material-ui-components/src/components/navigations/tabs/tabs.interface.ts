export interface ITabs {
  tabs: string[];
  selectedTab: string;
  handleChange: (value: string) => void;
  disabled?: boolean;
  fullWidth?: boolean;
}
