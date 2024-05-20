import React, { FC, ReactElement, useMemo, useEffect, useState } from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import { IMapGraph } from './mapGraph.interface';
import { MapWrapper } from './mapGraph.style';

import { data } from './countries';

export const MapGraph: FC<IMapGraph> = (props): ReactElement => {
  const { selectedStates, style } = props;
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const features = useMemo(() => {
    data.features = data.features.map((item: any, index) => {
      if (selectedStates.includes(item.properties.state_name)) {
        item = { ...item, fill: 'var(--main)' };
      }
      return { ...item, key: index, id: index.toString() };
    });
    return data.features;
  }, [selectedStates]);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth > 576 ? false : true);
    }
    window.addEventListener('resize', handleResize);
  });

  return (
    <MapWrapper sx={{ height: '350px', ...style }}>
      <ResponsiveChoropleth
        data={[]}
        features={features}
        domain={[0, 1000000]}
        colors="nivo"
        unknownColor="#eeeeee"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={isMobile ? 130 : 200}
        projectionTranslation={[0.5, 0.5]}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        borderColor="#152538"
        legends={[
          {
            anchor: 'bottom-left',
            direction: 'column',
            justify: true,
            translateX: 20,
            translateY: -100,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemTextColor: '#444444',
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000000',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </MapWrapper>
  );
};
