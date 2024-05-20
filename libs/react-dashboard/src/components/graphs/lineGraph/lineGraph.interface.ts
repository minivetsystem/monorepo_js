import { Serie } from '@nivo/line';

export interface ILineGraph {
  chartData: Serie[];
  axisBottomLegend: string;
  axisLeftLegend: string;
}
