import React, { FC, ReactElement, useState } from 'react';
import {
  Box,
  Grid,
  Popover,
  List,
  ListItem,
  Typography,
  Button,
  Modal,
} from '@mui/material';

import { filter } from 'lodash';
import LogoutIcon from '@mui/icons-material/LoginOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Table } from '../../components';
import {
  useCampaigns,
  useDeleteCampaign,
  useLeadTypes,
  useUsers,
} from '../../hooks';
import { setAutoFreeze, produce } from 'immer';
import { useNavigate } from 'react-router-dom';
import {
  NUMERIC_OPERATORS,
  STRING_OPERATORS,
  CAMPAIGN_LISTING_COLUMNS,
  CAMPAIGN_STATUS_OPTIONS,
} from '../../configs/constants';
import { campaignColumns } from './campaign_columns';
import { useSelector } from 'react-redux';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CustomButton } from '@monorepo/material-ui-components';

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

const ReportRenderToolbar = () => {
  const history = useNavigate();

  return (
    <GridToolbarContainer sx={{ top: -120 }}>
      <Button
        variant="text"
        startIcon={<AddCircleIcon />}
        onClick={() => history('/campaign')}
      >
        Add New
      </Button>
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
};

const Campaigns: FC = (): ReactElement => {
  setAutoFreeze(false);
  const history = useNavigate();
  const [openDeleteCampaignConfirmModal, setOpenDeleteCampaignConfirmModal] =
    useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>({});
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
    data: allCampaigns,
    isFetching,
    isPreviousData,
  } = useCampaigns(
    paginationModel.page,
    paginationModel.pageSize,
    sortModel,
    filterModel,
  );

  const { data: allClients } = useUsers(
    0,
    10,
    [],
    [
      {
        field: 'role',
        operators: '=',
        value: '64a259dbabebeb123da0bc12',
      },
    ],
  );

  const { data: allLeadTypes } = useLeadTypes();

  const { mutate: deleteCampaign, status: deleteCampaignStatus } =
    useDeleteCampaign(selectedCampaign?._id);

  React.useEffect(() => {
    if (deleteCampaignStatus === 'success') {
      setOpenDeleteCampaignConfirmModal(false);
      handleClose();
    }
  }, [deleteCampaignStatus]);

  const handleClick = (event: React.MouseEvent<HTMLElement>, campaign: any) => {
    setSelectedCampaign(campaign);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setFilterOptions({
      columns: CAMPAIGN_LISTING_COLUMNS,
      operators: [],
      value: '',
      field_type: '',
      filter_options: [],
    });
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const columnsList = campaignColumns(handleClick, handleClose);

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
    if (value === 'campaign_name') {
      field_type = 'text';
      setFilterOptions(
        produce((draft) => {
          draft.operators = STRING_OPERATORS;
        }),
      );
    } else if (
      value === 'client' ||
      value === 'lead_type' ||
      value === 'campaign_status'
    ) {
      if (value === 'client') {
        filter_options =
          allClients?.users?.map((client) => ({
            label: client.username,
            value: client._id,
          })) || [];
      } else if (value === 'lead_type') {
        filter_options =
          allLeadTypes?.map((lead_type) => ({
            label: lead_type.lead_type,
            value: lead_type._id,
          })) || [];
      } else if (value === 'campaign_status') {
        filter_options = CAMPAIGN_STATUS_OPTIONS;
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
    setFilterModel([selectedFilter]);
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

  const onDeleteCampaign = () => {
    deleteCampaign(selectedCampaign._id);
  };

  const rowCount = allCampaigns?.totalPages * paginationModel.pageSize;

  const campaignState = useSelector((state: any) => state.campaign);

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
            rows={allCampaigns?.campaigns || []}
            filterOptions={filterOptions}
            rowCount={rowCount}
            columns={columnsList}
            pageSizeOptions={[25, 50, 100]}
            loading={isFetching}
            slots={{
              toolbar: ReportRenderToolbar,
            }}
            slotProps={{
              toolbar: { counter: allCampaigns?.campaigns.length },
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
          horizontal: 120,
        }}
      >
        <List sx={{ p: 1 }}>
          <ListItem
            sx={{ cursor: 'pointer' }}
            onClick={() => history(`/campaign/${selectedCampaign._id}`)}
          >
            <LogoutIcon sx={{ mr: 1 }} />
            View
          </ListItem>
          <ListItem
            disabled={selectedCampaign?._id === campaignState.campaign._id}
            sx={{ cursor: 'pointer' }}
            onClick={() => setOpenDeleteCampaignConfirmModal(true)}
          >
            <DeleteIcon sx={{ mr: 1 }} />
            Delete
          </ListItem>
        </List>
      </Popover>
      <Modal
        open={openDeleteCampaignConfirmModal}
        onClose={() => setOpenDeleteCampaignConfirmModal(false)}
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
            Delete Campaign
          </Typography>
          <Typography variant="subtitle1" align="center" mb={2}>
            Are you sure you want to delete this campaign?
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <CustomButton
              buttonText="Yes"
              variant="contained"
              style={{ width: '120px' }}
              onClick={onDeleteCampaign}
            />
            <CustomButton
              buttonText="No"
              variant="outlined"
              style={{ width: '120px' }}
              onClick={() => setOpenDeleteCampaignConfirmModal(false)}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Campaigns;
