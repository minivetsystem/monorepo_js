import React,{ FC, ReactElement } from 'react';
import { Box } from '@mui/material';
import { TabsWrapper, TabWrapper } from './tabs.style';
import { ITabs } from './tabs.interface';

export const CustomTabs: FC<ITabs> = (props): ReactElement => {
  const { tabs, selectedTab, handleChange } = props;

  return (
    <Box borderBottom="1px solid #cfdbdf" mb={4.8}>
      <TabsWrapper
        value={selectedTab}
        onChange={(e, value) => handleChange(value)}
        variant="scrollable"
        allowScrollButtonsMobile
        TabIndicatorProps={{
          style: { transition: 'none' },
        }}
      >
        {tabs.map((item, index) => (
          <TabWrapper label={item} value={item} key={index} />
        ))}
      </TabsWrapper>
    </Box>
  );
};
