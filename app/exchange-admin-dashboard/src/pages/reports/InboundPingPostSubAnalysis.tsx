import React, { FC, ReactElement } from 'react';
import { Box, Grid, Menu, MenuItem } from '@mui/material';
import { Table } from '../../components';
import { setAutoFreeze, produce } from 'immer';
import { userColumns, columnGroupingModel } from './inbound_report_columns';
import { filter } from 'lodash';
import Fade from '@mui/material/Fade';
import { useLocation } from 'react-router-dom';
import { useInboundSubReport } from '../../hooks/reports/useInboundSubReport';

const InboundPingPostSubAnalysis: FC = (): ReactElement => {
  setAutoFreeze(false);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = React.useState({});
  const open = Boolean(anchorEl);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });

  const {
    data: inboundReport,
    isFetching,
    isPreviousData,
  } = useInboundSubReport({
    vendorId: query.get('vendor_id') as string,
    fromDate: query.get('from_date') as string,
    toDate: query.get('to_date') as string,
    pageSize: paginationModel.pageSize,
    pageOffset: paginationModel.page,
  });

  const onViewDetails = () => {
    window
      .open(
        `${
          window.location.origin
        }/reports/inbound-details?vendor_id=${query.get('vendor_id')}&reason=${
          selectedRow.error || ''
        }&from_date=${query.get('from_date')}&to_date=${query.get(
          'to_date',
        )}&total=${selectedRow.count}`,
        '_blank',
      )
      ?.focus();
  };

  const onPageChange = (ev) => {
    if (!isPreviousData && ev.page > paginationModel.page) {
      setPaginationModel(
        produce((draft) => {
          draft.page = paginationModel.page + 1;
          draft.pageSize = ev.pageSize;
        }),
      );
    } else {
      setPaginationModel(
        produce((draft) => {
          draft.page = Math.max(paginationModel.page - 1, 0);
          draft.pageSize = ev.pageSize;
        }),
      );
    }
  };

  const onOpenActionMenu = (
    event: React.MouseEvent<HTMLElement>,
    rowNo: number,
  ) => {
    setAnchorEl(event.currentTarget);
    const row = filter(inboundReport, { rowNo })[0];
    setSelectedRow(row);
  };

  const columnsList = userColumns(onOpenActionMenu);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const rowCount = 10;

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Table
            showFilterPanel={false}
            tableTitle=""
            description=""
            density="compact"
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={(ev) => onPageChange(ev)}
            getRowId={(row) => row?.rowNo}
            rows={inboundReport || []}
            rowCount={rowCount}
            columnGroupingModel={columnGroupingModel}
            experimentalFeatures={{ columnGrouping: true }}
            columns={columnsList}
            pageSizeOptions={[20, 40, 80]}
            isFetching={isFetching}
            filterMode="server"
            checkboxSelection={false}
            disableRowSelectionOnClick
            height="calc(100vh - 200px)"
            rowHeight={72}
            columnVisibilityModel={{
              rowNo: false,
            }}
          />
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={() => onViewDetails('')}>View</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InboundPingPostSubAnalysis;
