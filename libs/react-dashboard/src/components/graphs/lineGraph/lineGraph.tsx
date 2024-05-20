import React, { FC, ReactElement } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ILineGraph } from './lineGraph.interface';

export const LineGraph: FC<ILineGraph> = (props): ReactElement => {
  const { chartData, axisBottomLegend, axisLeftLegend } = props;
  return (
    <ResponsiveLine
      data={chartData}
      curve="monotoneX"
      margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: axisBottomLegend,
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: axisLeftLegend,
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
    />
  );
};
