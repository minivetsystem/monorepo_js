import React, { FC, ReactElement } from 'react';
import { filter, sumBy } from 'lodash';
import { Table } from '../../../components';
import { useLeadTypes, useUsersByRole, useRoles } from '../../../hooks';
import { setAutoFreeze, produce } from 'immer';
import {
  FILTER_DATE_RANGES,
  LEAD_MODES,
  LEAD_STATUS,
  REQUEST_TYPES,
} from '../../../configs/constants';
import { userColumns } from './list_lead_columns';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { TableFilter, TableAction } from './list_lead_filters';
import { tableData } from './list_lead.data';
import {
  ContainerStyle,
  ContentContainerStyle,
  LeftHeaderStyle,
  RightHeaderStyle,
  ScrollLayoutStyle,
  HeaderContainerStyle,
} from './list_lead.style';
import { Typography, List, Popover, ListItem } from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';

const ListLead: FC = (): ReactElement => {
  setAutoFreeze(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = React.useState({});
  const [filterModel, setFilterModel] = React.useState<any>([]);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const { data: allLeadTypes } = useLeadTypes();

  const { data: allVendors } = useUsersByRole({
    roleName: 'vendor',
    includeDisabled: false,
  });

  const { data: allClients } = useUsersByRole({
    roleName: 'client',
    includeDisabled: false,
  });

  const resetFilters = () => {
    setFilterModel(getDefaultFilters());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (allLeadTypes && allLeadTypes.length > 0) {
      resetFilters();
      setFilterModel(getDefaultFilters());
    }
  }, [allLeadTypes, allVendors, allClients]);

  const getDefaultFilters = () => {
    return [
      {
        field: 'lead_type',
        field_type: 'multi-choice',
        filter_options:
          allLeadTypes && allLeadTypes.length > 0
            ? allLeadTypes.map((type: any) => ({
                label: type.lead_type,
                value: type._id,
              }))
            : [],
        label: 'Lead type',
        value:
          allLeadTypes && allLeadTypes.length > 0 ? allLeadTypes[0]._id : '',
      },
      {
        field: 'onlydaterange',
        field_type: 'onlydaterange',
        filter_options: FILTER_DATE_RANGES,
        label: 'Date range',
        value: {
          onlydaterange: 'today',
          start_date: moment().startOf('day').format('YYYY-MM-DD'),
          end_date: moment().endOf('day').format('YYYY-MM-DD'),
        },
      },
      {
        field: 'list-lead-filter',
        field_type: 'list-lead-filter',
        filter_options: [],
        label: '',
        value: '',
      },
      {
        field: 'lead_mode',
        field_type: 'multi-choice',
        filter_options: LEAD_STATUS,
        label: 'Lead Status',
        value: LEAD_STATUS[0].value,
      },
      {
        field: 'request_type',
        field_type: 'multi-choice',
        filter_options: REQUEST_TYPES,
        label: 'Request Type',
        value: REQUEST_TYPES[0].value,
      },
      {
        field: 'rejection_reason_type',
        field_type: 'multi-choice',
        filter_options: [{ label: 'All', value: 'all' }],
        label: 'Rejection Reason Type',
        value: 'all',
      },
      {
        field: 'lead_mode',
        field_type: 'multi-choice',
        filter_options: LEAD_MODES,
        label: 'Lead Mode',
        value: LEAD_MODES[0].value,
      },
      {
        field: 'vendor',
        field_type: 'multi-choice-check',
        filter_options: allVendors
          ? allVendors.map((vendor: any) => ({
              label: `${vendor.first_name} ${vendor.last_name}`,
              value: vendor._id,
            }))
          : [],
        label: 'Vendor',
        value: '',
      },
      {
        field: 'client',
        field_type: 'multi-choice-check',
        filter_options: allClients
          ? allClients.map((client: any) => ({
              label: `${client.first_name} ${client.last_name}`,
              value: client._id,
            }))
          : [],
        label: 'Client',
        value: '',
      },
      {
        field: 'campaign',
        field_type: 'multi-choice-check',
        filter_options: [{ label: 'All', value: 'all' }],
        label: 'Campaign Account',
        value: 'all',
      },
      {
        field: 'go_btn',
        field_type: 'list-lead-filter-btn',
        filter_options: [],
        label: 'Go',
        value: '',
      },
    ];
  };

  const onOpenActionMenu = (
    event: React.MouseEvent<HTMLElement>,
    rowNo: number,
  ) => {
    setAnchorEl(event.currentTarget);
    const row = filter(tableData, { rowNo })[0];
    setSelectedRow(row);
  };

  const columnsList = userColumns(onOpenActionMenu);

  const onFilterValueChange = (ev: any, prop: string) => {
    if (ev.target?.value) {
      const { value } = ev.target;
      let startDate = '';
      let endDate = '';
      switch (value) {
        case 'today':
          startDate = moment().startOf('day').format('YYYY-MM-DD');
          endDate = moment().format('YYYY-MM-DD');
          break;
        case 'yesterday':
          startDate = moment()
            .subtract(1, 'day')
            .startOf('day')
            .format('YYYY-MM-DD');
          endDate = moment().format('YYYY-MM-DD');
          break;
        case 'thisweek':
          startDate = moment().startOf('week').format('YYYY-MM-DD');
          endDate = moment().format('YYYY-MM-DD');
          break;
      }

      setFilterModel(
        produce((draft: any) => {
          draft.map((filter: any) => {
            if (filter.field === prop) {
              filter.value.onlydaterange = value;
              filter.value.start_date = startDate;
              filter.value.end_date = endDate;
            }
            return filter;
          });
        }),
      );
    } else {
      setFilterModel(
        produce((draft: any) => {
          draft = draft.map((draftObj: any) => {
            if (draftObj.field === 'onlydaterange') {
              draftObj.value[prop] = moment(ev).toISOString();
            }
            return draftObj;
          });
        }),
      );
    }
  };

  const onFilterOptionChange = (ev: any, prop: string) => {
    const { value } = ev.target;

    if (value === 'onlydaterange') {
      setFilterModel(
        produce((draft: any) => {
          draft[0].value = value;
        }),
      );
    } else {
      setFilterModel(
        produce((draft: any) => {
          draft.map((filter: any) => {
            if (filter.field === prop) {
              filter.value = value;
            }
            return filter;
          });
        }),
      );
    }
  };

  const onResetFilters = () => {
    setFilterModel([]);
    resetFilters();
  };

  return (
    <ContainerStyle>
      <HeaderContainerStyle>
        <TableFilter
          onResetFilters={() => onResetFilters()}
          onFilterOptionChange={(opt, prop) => onFilterOptionChange(opt, prop)}
          onFilterValueChange={(opt, prop) => onFilterValueChange(opt, prop)}
          selectedFilters={filterModel}
        />
      </HeaderContainerStyle>

      <HeaderContainerStyle>
        <LeftHeaderStyle>
          <div style={{ display: 'flex', padding: '10px 0 0 8px' }}>
            <Typography sx={{ fontWeight: '600' }}>
              {'Total Afiliate Price: $201.46 '}
            </Typography>
            <span style={{ marginLeft: '4px' }}> | </span>
            <Typography sx={{ fontWeight: '600' }}>
              {'Total Astoria Price: $336.09'}
            </Typography>
          </div>
        </LeftHeaderStyle>
        <RightHeaderStyle>
          <TableAction />
        </RightHeaderStyle>
      </HeaderContainerStyle>

      <ContentContainerStyle>
        <ScrollLayoutStyle>
          <Table
            tableTitle=""
            description=""
            density="compact"
            getRowId={(row) => row?.row}
            rows={tableData || []}
            rowCount={sumBy(tableData, (val) => val.count)}
            experimentalFeatures={{ columnGrouping: true }}
            columns={columnsList}
            pageSizeOptions={[25, 50, 100]}
            isFetching={false}
            hideFooter={false}
            onResetFilters={() => onResetFilters()}
            onFilterOptionChange={(opt, prop) =>
              onFilterOptionChange(opt, prop)
            }
            onFilterValueChange={(opt, prop) => onFilterValueChange(opt, prop)}
            selectedFilters={filterModel}
            filterMode="server"
            checkboxSelection={true}
            disableRowSelectionOnClick
            rowHeight={25}
            columnVisibilityModel={{
              rowNo: false,
            }}
          />
        </ScrollLayoutStyle>
      </ContentContainerStyle>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{ vertical: -20, horizontal: 100 }}
      >
        <List sx={{ p: 0 }}>
          <ListItem sx={{ cursor: 'pointer' }}>
            <CalendarMonth sx={{ mr: 1 }} />
            Lead Details
          </ListItem>
          <ListItem sx={{ cursor: 'pointer' }}>
            <CalendarMonth sx={{ mr: 1 }} />
            Lead Responses
          </ListItem>
        </List>
      </Popover>
    </ContainerStyle>
  );
};

export default ListLead;
