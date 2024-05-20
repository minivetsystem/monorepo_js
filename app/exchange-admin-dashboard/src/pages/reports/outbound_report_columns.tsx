import { Box, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { GridColDef, GridColumnGroupingModel } from '@mui/x-data-grid';

export const columnGroupingModel: GridColumnGroupingModel = [
  {
    field: 'id',
  },
  {
    field: 'vendor_name',
  },
  {
    field: 'client_name',
  },
  {
    field: 'campaign_name',
  },
  {
    field: 'lead_type',
  },
  {
    field: 'client_rejection_reason',
  },
  {
    field: 'count',
  },
  {
    groupId: 'Ping Response Time',
    description: 'Ping Response Time',
    headerAlign: 'center',
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

  {
    groupId: 'Ping Prices',
    description: 'Ping Prices',
    headerAlign: 'center',
    children: [
      {
        field: 'min_bid_price',
      },
      {
        field: 'max_bid_price',
      },
      {
        field: 'avg_bid_price',
      },
    ],
  },
];

export const reportClientColumns = (): GridColDef[] => {
  return [
    {
      field: 'client_name',
      headerName: 'Client Name',
      editable: false,
      align: 'left',
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.client_name}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'total_leads',
      headerName: 'Client Total Leads',
      editable: false,
      align: 'left',
      width: 90,
      disableColumnMenu: true,
      sortable: false,
      headerClassName: 'wrapHeader',
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.total_leads}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'vendor_payout',
      headerName: 'Vendor Payout($)',
      editable: false,
      align: 'left',
      width: 90,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.vendor_payout}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'total_price',
      headerName: 'Client Total Price($)',
      editable: false,
      align: 'left',
      width: 90,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.total_price}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'return_leads',
      headerName: 'Return Leads',
      editable: false,
      align: 'left',
      width: 90,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.return_leads}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'return_lead_revenue_lost',
      headerName: 'Return Lead Revenue lost($)',
      editable: false,
      align: 'left',
      width: 115,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.return_lead_revenue_lost}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'return_lead_cost_credit',
      headerName: 'Return Lead Cost Credit($)',
      editable: false,
      align: 'left',
      width: 115,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.return_lead_cost_credit}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'net_total_leads',
      headerName: 'Client Net Total Leads',
      editable: false,
      align: 'left',
      width: 115,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.net_total_leads}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'vendor_net_total_payout',
      headerName: 'Vendor Net Total Payout ($)',
      editable: false,
      align: 'left',
      width: 115,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.vendor_net_total_payout}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'net_total_price',
      headerName: 'Client Net Total Price ($)',
      editable: false,
      align: 'left',
      width: 115,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.net_total_price}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'net_average',
      headerName: 'Net Average ($)',
      editable: false,
      align: 'left',
      width: 90,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.net_average}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'margin',
      headerName: 'Margin ($)',
      editable: false,
      align: 'left',
      width: 60,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.margin}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'margin_percent',
      headerName: 'Margin (%)',
      editable: false,
      align: 'left',
      width: 60,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.margin_percent}
            </Typography>
          </Box>
        );
      },
    },
  ];
};

export const reportRevenueColumns = (): GridColDef[] => {
  return [
    {
      field: 'gross_revenue',
      headerName: 'Gross Revenue',
      editable: false,
      align: 'left',
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              ${params.row?.gross_revenue?.toFixed(2)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'returned_revenue',
      headerName: 'Returned Revenue',
      editable: false,
      align: 'left',
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              ${params.row?.returned_revenue?.toFixed(2)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'net_revenue',
      headerName: 'Net Revenue',
      editable: false,
      align: 'left',
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              ${params.row?.net_revenue?.toFixed(2)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'total_cost',
      headerName: 'Total Cost',
      editable: false,
      align: 'left',
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              ${params.row?.total_cost?.toFixed(2)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'returned_cost',
      headerName: 'Returned Cost',
      editable: false,
      align: 'left',
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              ${params.row?.returned_cost?.toFixed(2)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'net_cost',
      headerName: 'Net Cost',
      editable: false,
      align: 'left',
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              ${params.row?.net_cost?.toFixed(2)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'net_profit',
      headerName: 'Net Profit',
      editable: false,
      align: 'left',
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              ${params.row?.net_profit?.toFixed(2)}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'avg_revenue_per_lead',
      headerName: 'Avg Revenue Per Lead',
      editable: false,
      align: 'left',
      width: 200,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              ${params.row?.avg_revenue_per_lead?.toFixed(2)}
            </Typography>
          </Box>
        );
      },
    },
  ];
};

export const reportColumns = (): GridColDef[] => {
  return [
    {
      field: 'category',
      headerName: '',
      editable: false,
      align: 'left',
      width: 100,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.category}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'total_pings',
      headerName: 'Total Pings',
      editable: false,
      headerAlign: 'center',
      align: 'center',
      width: 150,
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
              {params.row.total_pings}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'accepted_pings',
      headerName: 'Accepted Pings',
      editable: false,
      headerAlign: 'center',
      align: 'center',
      width: 160,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.accepted_pings}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'rejected_pings',
      headerName: 'Rejected Pings',
      width: 160,
      editable: false,
      headerAlign: 'center',
      align: 'center',
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography variant="subtitle2" whiteSpace="break-spaces">
            {params.row.rejected_pings}
          </Typography>
        );
      },
    },
    {
      field: 'total_posts',
      headerName: 'Total Posts',
      editable: false,
      disableColumnMenu: true,
      sortable: false,
      width: 160,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <Typography variant="subtitle2" whiteSpace="break-spaces">
            {params.row.total_posts}
          </Typography>
        );
      },
    },
    {
      field: 'accepted_posts',
      headerName: 'Accepted Posts',
      editable: false,
      headerAlign: 'center',
      align: 'center',
      width: 160,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography
            variant="subtitle2"
            fontWeight={400}
            whiteSpace="break-spaces"
          >
            {params.row.accepted_posts}
          </Typography>
        );
      },
    },
    {
      field: 'rejected_posts',
      headerName: 'Rejected Posts',
      editable: false,
      headerAlign: 'center',
      align: 'center',
      width: 160,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography
            variant="subtitle2"
            fontWeight={400}
            whiteSpace="break-spaces"
          >
            {params.row.rejected_posts}
          </Typography>
        );
      },
    },
    {
      field: 'returned_posts',
      headerName: 'Returned Posts',
      editable: false,
      headerAlign: 'center',
      align: 'center',
      width: 160,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography
            variant="subtitle2"
            fontWeight={400}
            whiteSpace="break-spaces"
          >
            {params.row.returned_posts}
          </Typography>
        );
      },
    },
  ];
};

export const clientReportColumns = (onOpenActionMenu: any): GridColDef[] => {
  return [
    {
      field: 'vendor_name',
      headerName: 'Vendor',
      editable: false,
      headerAlign: 'center',
      align: 'center',
      width: 150,
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
      field: 'client_name',
      headerName: 'Client',
      editable: false,
      headerAlign: 'center',
      align: 'center',
      width: 160,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.client_name}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'campaign_name',
      headerName: 'Campaign',
      editable: false,
      headerAlign: 'center',
      align: 'center',
      width: 160,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Typography variant="subtitle2" whiteSpace="break-spaces">
              {params.row.campaign_name}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'error',
      headerName: 'Rejection Reason',
      editable: false,
      disableColumnMenu: true,
      sortable: true,
      width: 250,
      headerAlign: 'center',
      align: 'center',
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
      headerAlign: 'center',
      align: 'center',
      width: 100,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography
            variant="subtitle2"
            fontWeight={400}
            whiteSpace="break-spaces"
          >
            {params.row.count}
          </Typography>
        );
      },
    },
    {
      field: 'min_ping_time',
      headerName: 'Min',
      editable: false,
      headerAlign: 'center',
      align: 'center',
      width: 60,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography
            variant="subtitle2"
            fontWeight={400}
            whiteSpace="break-spaces"
          >
            {params.row.min_ping_time?.toFixed(3)}s
          </Typography>
        );
      },
    },
    {
      field: 'max_ping_time',
      headerName: 'Max',
      editable: false,
      headerAlign: 'center',
      align: 'center',
      width: 60,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography
            variant="subtitle2"
            fontWeight={400}
            whiteSpace="break-spaces"
          >
            {params.row.max_ping_time?.toFixed(3)}s
          </Typography>
        );
      },
    },
    {
      field: 'avg_ping_time',
      headerName: 'Avg',
      editable: false,
      headerAlign: 'center',
      align: 'center',
      width: 60,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography
            variant="subtitle2"
            fontWeight={400}
            whiteSpace="break-spaces"
          >
            {params.row.avg_ping_time?.toFixed(3)}s
          </Typography>
        );
      },
    },
    {
      field: 'min_bid_price',
      headerName: 'Min',
      editable: false,
      headerAlign: 'center',
      align: 'center',
      width: 60,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography
            variant="subtitle2"
            fontWeight={400}
            whiteSpace="break-spaces"
          >
            ${params.row.min_bid_price?.toFixed(2)}
          </Typography>
        );
      },
    },
    {
      field: 'max_bid_price',
      headerName: 'Max',
      editable: false,
      headerAlign: 'center',
      align: 'center',
      width: 60,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography
            variant="subtitle2"
            fontWeight={400}
            whiteSpace="break-spaces"
          >
            ${params.row.max_bid_price?.toFixed(2)}
          </Typography>
        );
      },
    },
    {
      field: 'avg_bid_price',
      headerName: 'Avg',
      editable: false,
      headerAlign: 'center',
      align: 'center',
      width: 60,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => {
        return (
          <Typography
            variant="subtitle2"
            fontWeight={400}
            whiteSpace="break-spaces"
          >
            ${params.row.avg_bid_price?.toFixed(2)}
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
              onClick={(ev) => onOpenActionMenu(ev, params.row.id)}
              sx={{ cursor: 'pointer' }}
            />
          </Box>
        );
      },
    },
  ];
};
