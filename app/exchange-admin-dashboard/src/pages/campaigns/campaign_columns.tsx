import { Box, Typography, IconButton, Chip } from '@mui/material';

import { GridColDef, getGridStringOperators } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const campaignColumns = (
  handleClick: (e: any) => void,
  handleClose: () => void,
): GridColDef[] => {
  return [
    {
      field: 'campaign_name',
      headerName: 'Name',
      editable: false,
      align: 'left',
      width: 200,
      disableColumnMenu: true,
      sortable: true,
      filterOperators: getGridStringOperators().filter(
        (operator) =>
          operator.value === 'contains' || operator.value === 'equals',
      ),
      renderCell: (params) => {
        return (
          <Box>
            <Typography
              variant="h5"
              fontWeight={400}
              color="info.main"
              whiteSpace="break-spaces"
            >
              {params.row.campaign_name}
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
      width: 250,
      disableColumnMenu: true,
      sortable: true,
      filterOperators: getGridStringOperators().filter(
        (operator) =>
          operator.value === 'contains' || operator.value === 'equals',
      ),
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="h5" fontWeight={400} whiteSpace="break-spaces">
              {params.row.lead_type?.lead_type}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'client',
      headerName: 'Client',
      editable: false,
      align: 'left',
      width: 200,
      disableColumnMenu: true,
      sortable: true,
      filterOperators: getGridStringOperators().filter(
        (operator) =>
          operator.value === 'contains' || operator.value === 'equals',
      ),
      renderCell: (params) => {
        return (
          <Box>
            <Typography
              variant="h5"
              fontWeight={400}
              color="info.main"
              whiteSpace="break-spaces"
            >
              {params.row.client?.username}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'campaign_status',
      headerName: 'Status',
      editable: false,
      disableColumnMenu: true,
      sortable: true,
      width: 150,
      headerAlign: 'left',
      align: 'left',
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'equals',
      ),
      valueGetter: (params: any) => {
        return params.row?.campaign_status ? 'Active' : 'Inactive';
      },
      renderCell: (params) => {
        return (
          <Chip
            label={params.row?.campaign_status ? 'Active' : 'Inactive'}
            color={params.row?.campaign_status ? 'success' : 'error'}
            variant="outlined"
          />
        );
      },
      renderHeader: () => {
        return (
          <Typography variant="h5" fontWeight={600}>
            Status
          </Typography>
        );
      },
    },
    {
      field: 'is_lead_flow_status',
      headerName: 'Lead flow',
      editable: false,
      disableColumnMenu: true,
      sortable: true,
      width: 150,
      headerAlign: 'left',
      align: 'left',
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'equals',
      ),
      valueGetter: (params: any) => {
        return params.row?.user_status ? 'Active' : 'Inactive';
      },
      renderCell: (params) => {
        return (
          <Chip
            label={params.row?.is_lead_flow_status ? 'Active' : 'Inactive'}
            color={params.row?.is_lead_flow_status ? 'success' : 'error'}
            variant="outlined"
          />
        );
      },
      renderHeader: () => {
        return (
          <Typography variant="h5" fontWeight={600}>
            Lead flow
          </Typography>
        );
      },
    },
    {
      field: 'is_allowed_by_ews',
      headerName: 'Allowed by EWS',
      editable: false,
      disableColumnMenu: true,
      sortable: true,
      width: 150,
      headerAlign: 'left',
      align: 'left',
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'equals',
      ),
      valueGetter: (params: any) => {
        return params.row?.user_status ? 'Active' : 'Inactive';
      },
      renderCell: (params) => {
        return (
          <Chip
            label={params.row?.is_allowed_by_ews ? 'Active' : 'Inactive'}
            color={params.row?.is_allowed_by_ews ? 'success' : 'error'}
            variant="outlined"
          />
        );
      },
      renderHeader: () => {
        return (
          <Typography variant="h5" fontWeight={600}>
            Allowed by EWS
          </Typography>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      disableColumnMenu: true,
      headerAlign: 'left',
      align: 'right',
      sortable: false,
      disableExport: true,
      disableReorder: true,
      filterable: false,
      renderCell: (params) => {
        return (
          <IconButton onClick={(e) => handleClick(e, params.row)}>
            <MoreVertIcon />
          </IconButton>
        );
      },
    },
  ];
};
