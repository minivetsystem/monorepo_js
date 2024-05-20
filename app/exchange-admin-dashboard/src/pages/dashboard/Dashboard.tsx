import React, { FC, ReactElement } from 'react';
import { Box, Grid } from '@mui/material';
import { Table } from '../../components';
import { useKPISummary } from '../../hooks';
import { leadTableColumns } from './leadtable_columns';
import { useSelector } from 'react-redux';

const Dashboard: FC = (): ReactElement => {
  const userState = useSelector((state: any) => state.user);
  const { data: kpiSummary, isFetching } = useKPISummary(userState.user._id);

  const columnsList = leadTableColumns();

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} xl={12}>
          <Table
            showFilterPanel={false}
            tableTitle={`KPI summary since ${kpiSummary?.start_date || ''}`}
            rows={kpiSummary?.data || []}
            getRowId={(row) => row?.lead_type}
            startDate={kpiSummary?.start_date}
            columns={columnsList}
            hideFooter={true}
            disableColumnMenu={true}
            isFetching={isFetching}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
