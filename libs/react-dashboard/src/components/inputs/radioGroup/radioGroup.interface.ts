export interface IRadioGroup {
  options: { label: string; value: string }[];
  onChange: (e: React.SyntheticEvent, checked: boolean) => void;
  value: any;
  label?: string;
  inputRef?: any;
}
