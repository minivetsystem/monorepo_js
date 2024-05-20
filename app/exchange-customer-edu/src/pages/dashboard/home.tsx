import { FC, ReactElement } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import {
  PaperWithTitle,
  MultiLineGraph,
  ProfileInfo,
  CircleCounterInfoBox,
  Table,
  Select,
} from '@monorepo/react-dashboard';
import {
  profileData,
  costData,
  lineGraphData,
  soldTableColumns,
  soldTableRows,
} from '../../mock';

export const Home: FC = (): ReactElement => {
  return (
    <Grid container spacing={4} px={2} display="flex" alignContent="stretch">
      <Grid display="flex" width="100%" item md={9} sm={8}>
        <PaperWithTitle
          title={
            <Box mb={3} display="flex" justifyContent="space-between">
              <Typography variant="h4">Sales Overveiw</Typography>
              <Select
                options={['Last 30 Days', 'Last 15 Days']}
                style={{ width: '143px' }}
                value="Last 30 Days"
                onChange={() => null}
              />
            </Box>
          }
        >
          <Box height={350} width="100%">
            <MultiLineGraph chartData={lineGraphData} />
          </Box>
        </PaperWithTitle>
      </Grid>
      <Grid display="flex" item md={3} sm={4} xs={12}>
        <ProfileInfo {...profileData} />
      </Grid>
      {Array.isArray(costData) &&
        costData?.map((item, index) => (
          <Grid display="flex" item md={3} sm={6} xs={12} key={index}>
            <CircleCounterInfoBox {...item} />
          </Grid>
        ))}
      <Grid display="flex" item xs={12}>
        <Table
          columns={soldTableColumns}
          rows={soldTableRows}
          pageSize={5}
          rowsPerPageOptions={[5]}
          tableTitle="Recent Sold"
        />
      </Grid>
    </Grid>
  );
};
