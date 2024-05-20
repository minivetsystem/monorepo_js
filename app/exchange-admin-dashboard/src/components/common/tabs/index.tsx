import React, { FC, ReactElement } from 'react';
import { Box, Tab, Tabs as TabsList } from '@mui/material';

interface TabsProps {
  tabs: string[];
  value: number;
  setValue: (value: number) => void;
}

export const Tabs: FC<TabsProps> = ({
  value,
  setValue,
  tabs,
}): ReactElement => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabsList
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
      >
        {tabs.map((item, index) => (
          <Tab
            sx={{
              textTransform: 'initial',
              fontSize: '18px',
              fontWeight: 600,
              color: 'text.primary',
              minHeight: 60,
              padding: '12px',
            }}
            disabled={item.disabled}
            key={index}
            label={item.label}
            {...a11yProps(index)}
          />
        ))}
      </TabsList>
    </Box>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
