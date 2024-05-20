import React, { FC, ReactElement, useState } from 'react';
import { Box, Grid, Popover, List, ListItem, Typography, Button, Modal } from '@mui/material';
import { filter } from 'lodash';
import { Logout, Delete, AddCircle } from '@mui/icons-material';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Table } from '../../components';
import { useUsers, useRoles, useDeleteUser } from '../../hooks';
import { setAutoFreeze, produce } from 'immer';
import { useNavigate } from 'react-router-dom';
import { NUMERIC_OPERATORS, STRING_OPERATORS, USER_LISTING_COLUMNS, USER_STATUS_OPTIONS } from '../../configs/constants';
import { userColumns } from './user_columns';
import { useSelector } from 'react-redux';
import { CustomButton } from '@monorepo/material-ui-components';

const style = {
  position: 'absolute' as 'absolute',
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

const ReportRenderToolbar = () => {
  const history = useNavigate();

  return (
    <GridToolbarContainer>
        <Button onClick={() => history('/user')} size="small" sx={{ top: '9px!important', m: "0 0 0 8px" }} variant="contained"><AddCircle sx={{ fontSize: "1rem", mr: "5px" }}/> Add New</Button>
        <GridToolbarExport printOptions={{ disableToolbarButton: true }} size="small" sx={{ top: '9px!important' }} variant="contained" />
    </GridToolbarContainer>
  );
};

const Users: FC = (): ReactElement => {
  setAutoFreeze(false);
  const history = useNavigate();
  const [openDeleteUserConfirmModal, setOpenDeleteUserConfirmModal] =
  useState(false);
  const [selectedUser, setSelectedUser] = useState<any>({});
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });
  const [sortModel, setSortModel] = React.useState([]);
  const [filterOptions, setFilterOptions] = React.useState({
    columns: [],
    operators: [],
  });
  const [selectedFilter, setSelectedFilter] = React.useState([
    {
      field: '',
      operator: '',
      value: '',
      field_type: '',
      filter_options: [],
    },
  ]);
  const [filterModel, setFilterModel] = React.useState([]);

  const {
    data: allUsers,
    isFetching,
    isPreviousData,
    status: fetchAllUsersStatus,
  } = useUsers(
    paginationModel.page,
    paginationModel.pageSize,
    sortModel,
    filterModel,
  );

  const { mutate: deleteUser, status: deleteUserStatus } = useDeleteUser(
    selectedUser?._id,
  );

  const { data: allRoles } = useRoles();

  React.useEffect(() => {
    if (deleteUserStatus === 'success') {
      setOpenDeleteUserConfirmModal(false);
      handleClose();
    }
  }, [deleteUserStatus]);

  const handleClick = (event: React.MouseEvent<HTMLElement>, user: any) => {
    setSelectedUser(user);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setFilterOptions({
      columns: USER_LISTING_COLUMNS,
      operators: [],
      value: '',
      field_type: '',
      filter_options: [],
    });
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const columnsList = userColumns(handleClick, handleClose);

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

  const onSortModelChange = (ev: any) => {
    setSortModel(ev);
  };

  const onFilterModelChange = (ev: any) => {
    const addedFilters = filter(ev.items, (itm) => {
      if (itm.value !== undefined) {
        return itm;
      }
    }).map((filter: any) => ({
      field: filter.field,
      operator: filter.operator,
      value: filter.value,
    }));
    setFilterModel(addedFilters);
  };

  const onFilterColumnChange = (ev: any) => {
    const { value } = ev.target;

    let field_type = '';
    let filter_options = [];
    if ( value === 'name' || value === 'phone' || value === 'email' || value === 'username' ) {
      field_type = 'text';
      setFilterOptions(
        produce((draft) => {
          draft.operators = STRING_OPERATORS;
        }),
      );
    } else if (value === 'role' || value === 'user_status') {
      if (value === 'role') {
        filter_options = allRoles.map((role) => ({
          label: role.name,
          value: role._id,
        }));
      } else if (value === 'user_status') {
        filter_options = USER_STATUS_OPTIONS;
      }
      field_type = 'multi-choice';
      setFilterOptions(
        produce((draft) => {
          draft.operators = NUMERIC_OPERATORS;
        }),
      );
    }
    setSelectedFilter(
      produce((draft) => {
        draft[0].field = value;
        draft[0].field_type = field_type;
        draft[0].filter_options = filter_options;
      }),
    );
  };

  const onFilterOperatorChange = (ev: any) => {
    const { value } = ev.target;

    setSelectedFilter(
      produce((draft) => {
        draft[0].operator = value;
      }),
    );
  };

  const onFilterValueChange = (ev: any) => {
    const { value } = ev.target;

    setSelectedFilter(
      produce((draft) => {
        draft[0].value = value;
      }),
    );
  };

  const onFilterOptionChange = (ev: any) => {
    const { value } = ev.target;

    setSelectedFilter(
      produce((draft) => {
        draft[0].value = value;
      }),
    );
  };

  const onApplyFilter = () => {
    setFilterModel(selectedFilter);
  };

  const onResetFilter = () => {
    setFilterModel([]);
    setSelectedFilter(
      produce((draft) => {
        draft[0].field = '';
        draft[0].operator = '';
        draft[0].value = '';
      }),
    );
  };

  const onDeleteUser = () => {
    deleteUser(selectedUser._id);
  };

  const rowCount = allUsers?.totalPages * paginationModel.pageSize;

  const userState = useSelector((state: any) => state.user);

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Table
            showFilterPanel={false}
            tableTitle=""
            description=""
            density="compact"
            getRowId={(row) => row?._id}
            rows={allUsers?.users || []}
            filterOptions={filterOptions}
            rowCount={rowCount}
            columns={columnsList}
            pageSizeOptions={[25, 50, 100]}
            loading={isFetching}
            slots={{
              toolbar: ReportRenderToolbar,
            }}
            slotProps={{
              toolbar: { counter: allUsers?.users?.length },
            }}
            onApplyFilter={() => onApplyFilter()}
            onResetFilter={() => onResetFilter()}
            selectedFilter={selectedFilter}
            onFilterOptionChange={(opt) => onFilterOptionChange(opt)}
            onFilterColumnChange={(opt) => onFilterColumnChange(opt)}
            onFilterOperatorChange={(opt) => onFilterOperatorChange(opt)}
            onFilterValueChange={(opt) => onFilterValueChange(opt)}
            onPaginationModelChange={(ev) => onPageChange(ev)}
            onSortModelChange={(ev) => onSortModelChange(ev)}
            onFilterModelChange={(ev) => onFilterModelChange(ev)}
            paginationModel={paginationModel}
            paginationMode="server"
            filterMode="server"
            checkboxSelection
            disableRowSelectionOnClick
            height="calc(100vh - 200px)"
            rowHeight={72}
          />
        </Grid>
      </Grid>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{
          vertical: -40,
          horizontal: 100,
        }}
      >
        <List sx={{ p: 1 }}>
          <ListItem
            sx={{ cursor: 'pointer' }}
            onClick={() => history(`/user/${selectedUser._id}`)}
          >
            <Logout sx={{ mr: 1 }} />
            View
          </ListItem>
          <ListItem
            disabled={selectedUser?._id === userState.user._id}
            sx={{ cursor: 'pointer' }}
            onClick={() => setOpenDeleteUserConfirmModal(true)}
          >
            <Delete sx={{ mr: 1 }} />
            Delete
          </ListItem>
        </List>
      </Popover>
      <Modal
        open={openDeleteUserConfirmModal}
        onClose={() => setOpenDeleteUserConfirmModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 500,
            fontSize: '12px',
            padding: '10px',
            margin: '0px',
          }}
        >
          <Typography variant="h4" align="center" mb={2}>
            Delete User
          </Typography>
          <Typography variant="subtitle1" align="center" mb={2}>
            Are you sure you want to delete this user?
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <CustomButton
              buttonText="Yes"
              variant="contained"
              style={{ width: '120px' }}
              onClick={onDeleteUser}
            />
            <CustomButton
              buttonText="No"
              variant="outlined"
              style={{ width: '120px' }}
              onClick={() => setOpenDeleteUserConfirmModal(false)}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Users;
