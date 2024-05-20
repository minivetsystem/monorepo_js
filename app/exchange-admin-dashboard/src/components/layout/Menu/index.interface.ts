export interface SelectedIndex {
  parentIndex?: number;
  childIndex?: number;
}

export interface SideBarContentProps {
  label: string;
  icon: any;
  route?: string;
  nestedList: any;
  index: number;
  selected: SelectedIndex;
  setSelected: (data: SelectedIndex) => void;
}
