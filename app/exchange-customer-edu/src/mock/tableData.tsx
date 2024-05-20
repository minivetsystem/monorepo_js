import { Avatar, Chip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const soldTableColumns: GridColDef[] = [
  { field: 'date', headerName: 'Date', flex: 1 },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1.5,
    editable: false,
    align: 'left',
    renderCell: (params) => (
      <>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: 'secondary.light',
          }}
        >
          <span style={{ color: '#ffffff', fontSize: '13px' }}>{`${
            params.row['firstName'][0] + params.row['lastName'][0]
          }`}</span>
        </Avatar>
        <span style={{ marginLeft: '8px' }}>{`${params.row['name']}`}</span>
      </>
    ),
  },
  {
    field: 'leadType',
    headerName: 'Lead Type',
    flex: 1.5,
    align: 'center',
    editable: false,
    headerAlign: 'center',
    renderCell: (params) => (
      <Chip
        sx={{ bgcolor: 'info.light' }}
        label={`${params.row['leadType']}`}
      />
    ),
  },
  {
    field: 'offer',
    headerName: 'Offer',
    flex: 2,
    align: 'left',
    editable: false,
    headerAlign: 'left',
  },
  {
    field: 'program',
    headerName: 'Program',
    headerAlign: 'left',
    align: 'left',
    flex: 3,
    editable: false,
  },
  {
    field: 'price',
    headerName: 'Price',
    sortable: false,
    flex: 1,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: (params) => <MoreVertIcon />,
  },
];

export const soldTableRows = [
  {
    id: 1,
    date: '1 Jan, 2023',
    firstName: 'John',
    lastName: 'Doe',
    name: `John Doe`,
    leadType: 'Shared',
    offer: 'Berkeley College',
    program: 'Business Administration - Management',
    price: '$20',
    action: '',
  },
  {
    id: 2,
    date: '1 Jan, 2023',
    name: `John Doe`,
    firstName: 'John',
    lastName: 'Doe',
    leadType: 'Shared',
    offer: 'Berkeley College',
    program: 'Business Administration - Management',
    price: '$20',
    action: '',
  },
  {
    id: 3,
    date: '1 Jan, 2023',
    firstName: 'John',
    lastName: 'Doe',
    name: `John Doe`,
    leadType: 'Shared',
    offer: 'Berkeley College',
    program: 'Business Administration - Management',
    price: '$20',
    action: '',
  },
  {
    id: 4,
    date: '1 Jan, 2023',
    firstName: 'John',
    lastName: 'Doe',
    name: `John Doe`,
    leadType: 'Shared',
    offer: 'Berkeley College',
    program: 'Business Administration - Management',
    price: '$20',
    action: '',
  },
  {
    id: 5,
    date: '1 Jan, 2023',
    name: `John Doe`,
    firstName: 'John',
    lastName: 'Doe',
    leadType: 'Shared',
    offer: 'Berkeley College',
    program: 'Business Administration - Management',
    price: '$20',
    action: '',
  },
  {
    id: 6,
    date: '1 Jan, 2023',
    name: `John Doe`,
    firstName: 'John',
    lastName: 'Doe',
    leadType: 'Shared',
    offer: 'Berkeley College',
    program: 'Business Administration - Management',
    price: '$20',
    action: '',
  },
];
