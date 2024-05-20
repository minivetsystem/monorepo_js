import React, { FC, ReactElement } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ILineGraph } from './multiLineGraph.interface';

export const MultiLineGraph: FC<ILineGraph> = (props): ReactElement => {
  const { chartData } = props;
  return (
    <ResponsiveLine
      data={chartData}
      curve="monotoneX"
      margin={{ top: 30, right: 30, bottom: 60, left: 60 }}
      lineWidth={3}
      yScale={{
        type: 'linear',
        min: 0,
        max: 30,
        nice: 5,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 10,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 10,
        tickValues: [0, 5, 10, 15, 20, 25, 30],
        legendPosition: 'middle',
      }}
      pointSize={0}
      useMesh={true}
      enableArea={true}
      enableGridX={false}
      enableGridY={false}
      colors={['#FCD34D', '#0EA5E9']}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          translateX: 10,
          translateY: 60,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};
