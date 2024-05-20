import { Box, Link, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';
import moment from 'moment';
import ReactJson from 'react-json-view';

export const columnGroupingModel: GridColumnGroupingModel = [
  {
    field: 'rowNo',
  },
  {
    field: 'vendor_name',
  },
  {
    field: 'lead_type',
  },
  {
    field: 'error',
  },
  {
    field: 'count',
  },
  {
    groupId: 'Ping Response Time',
    headerAlign: 'center',
    description: 'Ping Response Time',
    children: [
      {
        field: 'min_ping_time',
      },
      {
        field: 'max_ping_time',
      },
      {
        field: 'avg_ping_time',
      },
    ],
  },
];

export const userColumns = (onOpenActionMenu: any): GridColDef[] => {
  return [
    {
      field: 'rowNo',
      headerName: 'Row #',
      editable: false,
      align: 'center',
      width: 80,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.rowNo}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'vendor_name',
      headerName: 'Vendor',
      editable: false,
      align: 'left',
      width: 310,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography
              variant="subtitle2"
              fontWeight={400}
              whiteSpace="break-spaces"
            >
              {params.row.vendor_name}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'lead_type',
      headerName: 'Lead Type',
      editable: false,
      align: 'left',
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.lead_type}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'error',
      headerName: 'Response status',
      width: 200,
      editable: false,
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography variant="subtitle2" whiteSpace="break-spaces">
            {params.row.error}
          </Typography>
        );
      },
    },
    {
      field: 'count',
      headerName: 'Count',
      editable: false,
      disableColumnMenu: true,
      sortable: false,
      width: 100,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <Typography variant="subtitle2" whiteSpace="break-spaces">
            {params.row.count}
          </Typography>
        );
      },
    },
    {
      field: 'min_ping_time',
      headerName: 'Min',
      editable: false,
      headerAlign: 'left',
      width: 100,
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography
            variant="subtitle2"
            fontWeight={400}
            whiteSpace="break-spaces"
          >
            {params.row.min_ping_time?.toFixed(2)}s
          </Typography>
        );
      },
    },
    {
      field: 'max_ping_time',
      headerName: 'Max',
      editable: false,
      headerAlign: 'left',
      width: 100,
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography
            variant="subtitle2"
            fontWeight={400}
            whiteSpace="break-spaces"
          >
            {params.row.max_ping_time?.toFixed(2)}s
          </Typography>
        );
      },
    },
    {
      field: 'avg_ping_time',
      headerName: 'Avg',
      editable: false,
      headerAlign: 'left',
      width: 100,
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography
            variant="subtitle2"
            fontWeight={400}
            whiteSpace="break-spaces"
          >
            {params.row.avg_ping_time?.toFixed(2)}s
          </Typography>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      disableColumnMenu: true,
      sortable: false,
      editable: false,
      align: 'center',
      width: 100,
      renderCell: (params) => {
        return (
          <Box display="flex" gap="10px">
            <MoreHorizIcon
              onClick={(ev) => onOpenActionMenu(ev, params.row.rowNo)}
              sx={{ cursor: 'pointer' }}
            />
          </Box>
        );
      },
    },
  ];
};

export const inboundReportDetailsColumns = (
  onViewRequestPayload: (e: string) => void,
): GridColDef[] => {
  return [
    {
      field: 'rowNo',
      headerName: 'Row #',
      editable: false,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: 'left',
      width: 60,
      renderCell: (params) => {
        return (
          <Typography
            variant="h5"
            fontWeight={600}
            color="info.main"
            whiteSpace="break-spaces"
          >
            {params.row.rowNo}
          </Typography>
        );
      },
    },
    {
      field: 'vendor_name',
      headerName: 'Vendor',
      editable: false,
      align: 'left',
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography variant="h5" whiteSpace="break-spaces">
            {`${params.row.vendor_first_name} ${params.row.vendor_last_name}`}
          </Typography>
        );
      },
    },
    {
      field: 'ping_time',
      headerName: 'Date/Time',
      width: 180,
      editable: false,
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography variant="h5" whiteSpace="break-spaces">
            {moment(params.row.ping_time).format('YYYY-MM-DD HH:mm')}
          </Typography>
        );
      },
    },
    {
      field: 'response_time',
      headerName: 'Response time',
      editable: false,
      disableColumnMenu: true,
      sortable: false,
      width: 110,
      headerAlign: 'left',
      align: 'left',
      renderCell: (params) => {
        return (
          <Typography variant="h5" whiteSpace="break-spaces">
            {params.row.response_time || 0}s
          </Typography>
        );
      },
    },
    {
      field: 'request_payload',
      headerName: 'Request',
      editable: false,
      headerAlign: 'left',
      width: 100,
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link
            onClick={() => onViewRequestPayload(params.row.request_payload)}
            tabIndex={0}
            component="button"
          >
            Click here
          </Link>
        );
      },
    },
    {
      field: 'response_payload',
      headerName: 'Vendor Response',
      editable: false,
      headerAlign: 'left',
      width: 100,
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link
            onClick={() => onViewRequestPayload(params.row.response_payload)}
            tabIndex={0}
            component="button"
          >
            Click here
          </Link>
        );
      },
    },
    {
      field: 'client_response_payload',
      headerName: 'Client response',
      headerAlign: 'left',
      align: 'left',
      flex: 0.3,
      minWidth: 1500,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography
            variant="subtitle1"
            sx={{ fontSize: '10px', textWrap: 'wrap' }}
          >
            {params.row.client_response_payload}
          </Typography>
        );
      },
    },
  ];
};
