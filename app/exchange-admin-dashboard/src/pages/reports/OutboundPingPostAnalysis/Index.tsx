import React, { FC, ReactElement } from 'react';
import { useLeadTypes, useUsersByRole } from '../../../hooks';
import { setAutoFreeze, produce } from 'immer';
import { FILTER_DATE_RANGES, LEAD_MODES } from '../../../configs/constants';
import { TableFilter } from './list_lead_filters';
import TopTableComponent from './top_table';
import { ContainerStyle, HeaderContainerStyle } from './list_lead.style';
import {
  List,
  Popover,
  ListItem,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { CalendarMonth } from '@mui/icons-material';
import { MuiTable } from './index.style';
import moment from 'moment';

const OutboundPingPostAnalysisReport: FC = (): ReactElement => {
  setAutoFreeze(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [filterModel, setFilterModel] = React.useState<any>([]);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const { data: allLeadTypes } = useLeadTypes();

  const { data: allVendors } = useUsersByRole({
    roleName: 'vendor',
    includeDisabled: false,
  });

  const getColorForVendor = (vendor:any) => {
    if (vendor) {
      return 'red';
    } else {
      return 'blue';
    }
  };

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
        label: 'Campaign Type',
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
        value: ''
      },
      {
        field: 'vendor',
        field_type: 'multi-choice-check',
        filter_options: allVendors
          ? allVendors.map((vendor: any) => ({
              label: `${vendor.first_name} ${vendor.last_name}`,
              value: vendor._id,
              color: getColorForVendor(vendor.first_name),
            }))
          : [],
        label: "Vendor",
        value: ''
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
        label: "Client",
        value: ''
      },
      {
        field: 'campaign',
        field_type: 'multi-choice-check',
        filter_options: [{ label: 'All', value: 'all' }],
        label: "Campaign Account",
        value: 'all'
      },
      {
        field: 'lead_mode',
        field_type: 'multi-choice',
        filter_options: LEAD_MODES,
        label: 'Lead Mode',
        value: LEAD_MODES[0].value,
      },
      {
        field: 'go_btn',
        field_type: 'list-lead-filter-btn',
        filter_options: [],
        label: 'Go',
        value: "",
      },
    ];
  };

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
              draftObj.value[prop] = moment(ev).format('YYYY-MM-DD');
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
    <ContainerStyle sx={{ p: "15px 15px 2rem" }}>
      <HeaderContainerStyle>
          <TableFilter
            onResetFilters={() => onResetFilters()}
            onFilterOptionChange={(opt, prop) =>
              onFilterOptionChange(opt, prop)
            }
            onFilterValueChange={(opt, prop) => onFilterValueChange(opt, prop)}
            selectedFilters={filterModel}
          />
      </HeaderContainerStyle>

      <>
        <TopTableComponent />

        <TableContainer component={Paper}>
          <MuiTable sx={{ borderTop: "1px solid #ddd" }}>
            <TableHead className='bggray'>
              <TableRow className='text-center'>
                <TableCell component="th">Client Name</TableCell>
                <TableCell component="th">Client Total Leads</TableCell>
                <TableCell component="th">Vendor Payout ($)</TableCell>
                <TableCell component="th">Client Total Price ($)</TableCell>
                <TableCell component="th">Return Leads</TableCell>
                <TableCell component="th">Return Lead Revenue lost ($)</TableCell>
                <TableCell component="th">Return Lead Cost Credit ($)</TableCell>
                <TableCell component="th">Client Net Total Leads</TableCell>
                <TableCell component="th">Vendor Net Total Payout ($)</TableCell>
                <TableCell component="th">Client Net Total Price ($)</TableCell>
                <TableCell component="th">Net Average ($)</TableCell>
                <TableCell component="th">Margin ($)</TableCell>
                <TableCell component="th">Margin (%)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 20 }, (_, index) => (
                <TableRow key={index} className='text-center'>
                  <TableCell>James Linda</TableCell>
                  <TableCell>31,415,442</TableCell>
                  <TableCell>392775</TableCell>
                  <TableCell>31,022,667</TableCell>
                  <TableCell>83,582</TableCell>
                  <TableCell>83,582</TableCell>
                  <TableCell>83,582</TableCell>
                  <TableCell>83,582</TableCell>
                  <TableCell>83,582</TableCell>
                  <TableCell>392775</TableCell>
                  <TableCell>31,022,667</TableCell>
                  <TableCell>83,582</TableCell>
                  <TableCell>83,582</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transformOrigin={{ vertical: -20, horizontal: 100, }}
      >
        <List sx={{ p: 0 }}>
            <ListItem sx={{ cursor: 'pointer' }}><CalendarMonth sx={{ mr: 1 }} />Lead Details</ListItem>
            <ListItem sx={{ cursor: 'pointer' }}><CalendarMonth sx={{ mr: 1 }} />Lead Responses</ListItem>
        </List>
      </Popover>
    </ContainerStyle>
  );
};

export default OutboundPingPostAnalysisReport;
