import { Serie } from '@nivo/line';

export interface IBarGraph {
  chartData: Serie[];
  axisBottomLegend: string;
  axisLeftLegend: string;
  keys: string[];
  indexBy: string;
  fill: {
    match: {
      id: string;
    };
    id: string;
  }[];
}
