import React, { FC, ReactElement } from 'react';
import { Box, Grid, Modal, Paper, TableContainer } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useRequestsByRejectionReason } from '../../hooks';
import { filter } from 'lodash';
import ReactJson from 'react-json-view';
import { Table } from '../../components';
import { inboundReportDetailsColumns } from './inbound_report_columns';
import { CloseOutlined } from '@mui/icons-material';
import { setAutoFreeze, produce } from 'immer';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const OutboundClientPingPostAnalysisDetails: FC = (): ReactElement => {
  const { search } = useLocation();
  setAutoFreeze(false);
  const query = new URLSearchParams(search);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 20,
    page: 0,
  });
  const [openViewRequestPayloadModal, setOpenViewRequestPayloadModal] =
    React.useState(false);
  const [selectedRequestPayload, setSelectedRequestPayload] =
    React.useState('');
  const {
    data: requests,
    isFetching,
    isPreviousData,
  } = useRequestsByRejectionReason({
    vendorId: query.get('vendor_id'),
    fromDate: query.get('from_date'),
    toDate: query.get('to_date'),
    reason: query.get('reason'),
    pageSize: paginationModel.pageSize,
    pageOffset: paginationModel.page,
  });

  const onViewRequestPayload = (value: string) => {
    setSelectedRequestPayload(value);
    setOpenViewRequestPayloadModal(true);
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

  const columnsList = inboundReportDetailsColumns(onViewRequestPayload);

  const requestData = requests
    ? filter(requests, (request) => {
        return request;
      }).map((request, idx) => ({ rowNo: idx + 1, ...request }))
    : [];

  const rowCount = parseInt(query.get('total'));

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table
              showFilterPanel={false}
              tableTitle=""
              density="compact"
              rows={requestData || []}
              getRowId={(row) => row?.rowNo}
              columns={columnsList}
              rowCount={rowCount}
              pageSizeOptions={[20, 40, 80]}
              disableColumnMenu={true}
              isFetching={isFetching}
              paginationMode="server"
              paginationModel={paginationModel}
              onPaginationModelChange={(ev) => onPageChange(ev)}
              disableRowSelectionOnClick
              height="calc(100vh - 200px)"
              rowHeight={72}
              columnVisibilityModel={{
                rowNo: false,
              }}
            />
            <Modal
              open={openViewRequestPayloadModal}
              onClose={() => setOpenViewRequestPayloadModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  ...style,
                  width: 800,
                  height: 500,
                  overflow: 'auto',
                  fontSize: '12px',
                  padding: '10px',
                  margin: '0px',
                }}
              >
                <CloseOutlined
                  sx={{ float: 'right', cursor: 'pointer' }}
                  onClick={() => setOpenViewRequestPayloadModal(false)}
                />
                <Box sx={{ marginTop: 2 }}>
                  {selectedRequestPayload?.length > 0 && (
                    <ReactJson src={JSON.parse(selectedRequestPayload)} />
                  )}
                </Box>
              </Box>
            </Modal>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OutboundClientPingPostAnalysisDetails;
