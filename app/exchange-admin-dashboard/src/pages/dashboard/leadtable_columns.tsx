import { Typography } from '@mui/material';

import { GridColDef } from '@mui/x-data-grid';

export const leadTableColumns = (): GridColDef[] => {
  return [
    {
      field: 'lead_type',
      headerName: 'Lead Type',
      editable: false,
      disableColumnMenu: true,
      sortable: false,
      headerAlign: 'left',
      width: 180,
      renderCell: (params) => {
        return (
          <Typography
            variant="h5"
            fontWeight={600}
            color="info.main"
            whiteSpace="break-spaces"
          >
            {params.row.lead_type}
          </Typography>
        );
      },
    },
    {
      field: 'revenue',
      headerName: 'Revenue',
      editable: false,
      align: 'left',
      width: 90,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography variant="h5" whiteSpace="break-spaces">
            ${params.row?.revenue?.toFixed(2)}
          </Typography>
        );
      },
    },
    {
      field: 'commission',
      headerName: 'Commission',
      width: 120,
      editable: false,
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography variant="h5" whiteSpace="break-spaces">
            ${params.row?.commission?.toFixed(2)}
          </Typography>
        );
      },
    },
    {
      field: 'net_profit',
      headerName: 'Net Profit',
      editable: false,
      disableColumnMenu: true,
      sortable: false,
      width: 110,
      headerAlign: 'left',
      align: 'left',
      renderHeader: () => {
        return (
          <Typography variant="h5" fontWeight={600}>
            Net Profit
          </Typography>
        );
      },
      renderCell: (params) => {
        return (
          <Typography variant="h5" whiteSpace="break-spaces">
            ${params.row?.net_profit?.toFixed(2)}
          </Typography>
        );
      },
    },
    {
      field: 'profit_percent',
      headerName: '%',
      editable: false,
      headerAlign: 'left',
      width: 80,
      align: 'left',
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography variant="h5" whiteSpace="break-spaces">
            {params.row?.profit_percent?.toFixed(2)}
          </Typography>
        );
      },
    },
    {
      field: 'no_of_pings_received',
      headerName: 'Pings In',
      headerAlign: 'left',
      align: 'left',
      width: 80,
      disableColumnMenu: true,
      sortable: false,
      renderHeader: () => {
        return (
          <Typography variant="h5" fontWeight={600}>
            Pings <br />
            In
          </Typography>
        );
      },
    },
    {
      field: 'no_of_pings_sent',
      headerAlign: 'left',
      headerName: 'Pings Out',
      align: 'left',
      width: 80,
      editable: false,
      disableColumnMenu: true,
      sortable: false,
      renderHeader: () => {
        return (
          <Typography variant="h5" fontWeight={600}>
            Pings <br />
            out
          </Typography>
        );
      },
    },
    {
      field: 'pings_out_bid_on',
      headerName: '# Pings Out Bid On',
      align: 'left',
      disableColumnMenu: true,
      width: 95,
      sortable: false,
      renderHeader: () => {
        return (
          <Typography variant="h5" fontWeight={600}>
            Pings Out
            <br />
            Bid On
            <br />
          </Typography>
        );
      },
    },
    {
      field: 'pings_in_bid_on',
      headerName: '# Pings In Bid On',
      disableColumnMenu: true,
      align: 'left',
      width: 85,
      sortable: false,
      renderHeader: () => {
        return (
          <Typography variant="h5" fontWeight={600}>
            Pings In
            <br />
            Bid On
            <br />
          </Typography>
        );
      },
    },
    {
      field: 'no_of_posts_in',
      align: 'left',
      headerName: '# Posts In',
      disableColumnMenu: true,
      sortable: false,
      width: 80,
      renderHeader: () => {
        return (
          <Typography variant="h5" fontWeight={600}>
            Posts <br />
            In
          </Typography>
        );
      },
    },
    {
      field: 'no_of_posts_out',
      headerName: '# Posts Out',
      align: 'left',
      width: 75,
      disableColumnMenu: true,
      sortable: false,
      renderHeader: () => {
        return (
          <Typography variant="h5" fontWeight={600}>
            Posts <br />
            Out
          </Typography>
        );
      },
    },
    {
      field: 'no_of_posts_accepted',
      align: 'left',
      headerName: '# Posts In/Out Accepted',
      disableColumnMenu: true,
      width: 118,
      sortable: false,
      renderHeader: () => {
        return (
          <Typography variant="h5" fontWeight={600}>
            Posts In/Out
            <br />
            Accepted
          </Typography>
        );
      },
    },
  ];
};
