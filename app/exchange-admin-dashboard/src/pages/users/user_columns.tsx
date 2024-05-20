import { Box, Typography, IconButton, Chip } from '@mui/material';
import { GridColDef, getGridStringOperators } from '@mui/x-data-grid';
import { MoreHoriz } from '@mui/icons-material';

export const userColumns = (
  handleClick: (e: any) => void,
  handleClose: () => void,
): GridColDef[] => {
  return [
    {
      field: 'username',
      headerName: 'Username',
      headerAlign: 'center',
      editable: false,
      align: 'center',
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
              {params.row.username}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'name',
      headerName: 'Name',
      headerAlign: 'center',
      editable: false,
      align: 'center',
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
            <Typography variant="h5" fontWeight={400} whiteSpace="break-spaces">
              {`${params.row?.first_name || ''} ${
                params.row?.middle_name || ''
              } ${params.row?.last_name || ''}`}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'primary_phone',
      headerName: 'Phone',
      headerAlign: 'center',
      editable: false,
      align: 'center',
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
            {params.row.primary_phone !== "" ? <Typography
              variant="h5"
              fontWeight={400}
              color="info.main"
              whiteSpace="break-spaces"
            >
               {params.row.primary_phone}
            </Typography> : 'N/A' }
          </Box>
        );
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      headerAlign: 'center',
      width: 250,
      editable: false,
      align: 'center',
      disableColumnMenu: true,
      sortable: true,
      filterOperators: getGridStringOperators().filter(
        (operator) =>
          operator.value === 'contains' || operator.value === 'equals',
      ),
      renderCell: (params) => {
        return (
          <Typography
            color="info.main"
            variant="h5"
            fontWeight={400}
            whiteSpace="break-spaces"
          >
            {params.row.email}
          </Typography>
        );
      },
    },
    {
      field: 'user_status',
      headerName: 'User Status',
      headerAlign: 'center',
      editable: false,
      disableColumnMenu: true,
      sortable: true,
      width: 200,
      align: 'center',
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'equals',
      ),
      valueGetter: (params: any) => {
        let status = '';
        if (params.row?.user_status === 'active_test') {
          status = 'Active Test';
        } else if (params.row?.user_status === 'active_live') {
          status = 'Active Live';
        } else {
          status = 'Inactive';
        }
        return params.row?.user_status === status;
      },
      renderCell: (params) => {
        let status = '';
        if (params.row?.user_status === 'active_test') {
          status = 'Active Test';
        } else if (params.row?.user_status === 'active_live') {
          status = 'Active Live';
        } else {
          status = 'Inactive';
        }
        return (
          <Chip sx={{ background: "#A855F7", color: "#fff", fontWeight: "600", border: "none", fontSize: "0.7rem" }}
            label={status}
            color={
              params.row?.user_status === 'active_live' ||
              params.row?.user_status === 'active_test'
                ? 'success'
                : 'error'
            }
            variant="outlined"
          />
        );
      },
      renderHeader: () => {
        return (
          <Typography variant="h5" fontWeight={600}>
            User Status
          </Typography>
        );
      },
    },
    {
      field: 'role',
      headerName: 'Role',
      editable: false,
      headerAlign: 'center',
      width: 120,
      align: 'center',
      disableColumnMenu: true,
      sortable: true,
      filterOperators: getGridStringOperators().filter(
        (operator) => operator.value === 'equals',
      ),
      valueGetter: (params: any) => params.row?.role?.name,
      renderCell: (params) => {
        return (
          <Typography variant="h5" fontWeight={400} whiteSpace="break-spaces">
            {params.row.role !== undefined ? params.row?.role?.name : 'N/A' }
          </Typography>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      disableExport: true,
      disableReorder: true,
      filterable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <IconButton onClick={(e) => handleClick(e, params.row)}>
            <MoreHoriz />
          </IconButton>
        );
      },
    },
  ];
};
