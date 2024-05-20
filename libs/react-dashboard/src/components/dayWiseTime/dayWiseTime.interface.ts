export interface IDayWiseTime {
  fields: any[];
  onClickDayName: (i: number) => void;
  onClickTimeButton: (i: number) => void;
  onChangeTime: (value: string, name: string, i: number) => void;
}
