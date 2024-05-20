import React, { FC, ReactElement } from 'react';
import { Box, Grid, Menu, MenuItem } from '@mui/material';
import { filter, sumBy } from 'lodash';
import { Table } from '../../components';
import {
  useLeadTypes,
  useOutboundClientPingPostReport,
  useUsersByRole,
} from '../../hooks';
import { setAutoFreeze, produce } from 'immer';
import {
  REQUEST_TYPES,
  LEAD_MODES,
  FILTER_DATE_RANGES,
} from '../../configs/constants';
import {
  clientReportColumns,
  columnGroupingModel,
} from './outbound_report_columns';
import moment from 'moment';
import Fade from '@mui/material/Fade';

const OutboundClientPingPostAnalysis: FC = (): ReactElement => {
  setAutoFreeze(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = React.useState({});
  const open = Boolean(anchorEl);
  const [filterModel, setFilterModel] = React.useState<any>([]);
  const [reportParams, setReportParams] = React.useState({
    requestType: '',
    leadMode: '',
    startDate: '',
    endDate: '',
    leadTypeId: '',
    vendorId: '',
  });

  const { data: outboundReport, isFetching } =
    useOutboundClientPingPostReport(reportParams);

  const { data: allVendors } = useUsersByRole({
    roleName: 'vendor',
    includeDisabled: false,
  });

  const { data: allLeadTypes } = useLeadTypes();

  const resetFilters = () => {
    const allFilters = getDefaultFilters();
    setFilterModel(allFilters);
  };

  React.useEffect(() => {
    if (allLeadTypes?.length > 0 && allVendors?.length > 0) {
      const allFilters = getDefaultFilters();
      setReportParams(
        produce((draft) => {
          draft.requestType = filter(allFilters, {
            field: 'request_type',
          })[0].value;
          draft.leadMode = filter(allFilters, { field: 'lead_mode' })[0].value;
          draft.startDate = filter(allFilters, {
            field: 'daterange',
          })[0].value.start_date;
          draft.endDate = filter(allFilters, {
            field: 'daterange',
          })[0].value.end_date;
          draft.leadTypeId = filter(allFilters, {
            field: 'lead_type',
          })[0].value;
          draft.vendorId = filter(allFilters, { field: 'vendor' })[0].value;
        }),
      );
      setFilterModel(allFilters);
    }
  }, [allLeadTypes, allVendors]);

  const getDefaultFilters = () => {
    return [
      {
        field: 'lead_type',
        field_type: 'multi-choice',
        filter_options:
          allLeadTypes && allLeadTypes.length > 0
            ? allLeadTypes.map((type: any) => ({
                label: type.lead_type,
                value: type.lead_type_id,
              }))
            : [],
        label: 'Lead type',
        value:
          allLeadTypes && allLeadTypes.length > 0
            ? allLeadTypes[0].lead_type_id
            : '',
      },
      {
        field: 'daterange',
        field_type: 'daterange',
        filter_options: FILTER_DATE_RANGES,
        label: 'Date range',
        value: {
          daterange: 'today',
          start_date: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
          end_date: moment().format('YYYY-MM-DD HH:mm:ss'),
        },
      },
      {
        field: 'request_type',
        field_type: 'multi-choice',
        filter_options: REQUEST_TYPES,
        label: 'Type',
        value: REQUEST_TYPES[0].value,
      },
      {
        field: 'lead_mode',
        field_type: 'multi-choice',
        filter_options: LEAD_MODES,
        label: 'Mode',
        value: LEAD_MODES[0].value,
      },
      {
        field: 'vendor',
        field_type: 'multi-choice',
        filter_options: allVendors
          ? allVendors.map((vendor: any) => ({
              label: `${vendor.first_name} ${vendor.last_name}`,
              value: vendor._id,
            }))
          : [],
        label: 'Vendor',
        value: '',
      },
    ];
  };

  const onViewDetails = () => {
    const dateRange = filter(filterModel, { field: 'daterange' })[0];
    window
      .open(
        `${window.location.origin}/reports/outbound-details?vendor_id=${
          selectedRow.vendor_id
        }&reason=${selectedRow.error || ''}&from_date=${
          dateRange.value.start_date
        }&to_date=${dateRange.value.end_date}&total=${selectedRow.count}`,
        '_blank',
      )
      ?.focus();
  };

  const onOpenActionMenu = (
    event: React.MouseEvent<HTMLElement>,
    rowNo: number,
  ) => {
    setAnchorEl(event.currentTarget);
    const row = filter(outboundReport, { id: rowNo })[0];
    setSelectedRow(row);
  };

  const columnsList = clientReportColumns(onOpenActionMenu);

  const onFilterValueChange = (ev: any, prop: string) => {
    if (ev.target?.value) {
      const { value } = ev.target;
      let startDate = '';
      let endDate = '';
      switch (value) {
        case 'today':
          startDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
          endDate = moment().format('YYYY-MM-DD HH:mm:ss');
          break;
        case 'yesterday':
          startDate = moment()
            .subtract(1, 'day')
            .startOf('day')
            .format('YYYY-MM-DD HH:mm:ss');
          endDate = moment().format('YYYY-MM-DD HH:mm:ss');
          break;
        case 'this_week':
          startDate = moment().startOf('week').format('YYYY-MM-DD HH:mm:ss');
          endDate = moment().format('YYYY-MM-DD HH:mm:ss');
          break;
        case 'last_week':
          startDate = moment()
            .subtract(1, 'week')
            .startOf('week')
            .format('YYYY-MM-DD HH:mm:ss');
          endDate = moment()
            .subtract(1, 'week')
            .endOf('week')
            .format('YYYY-MM-DD HH:mm:ss');
          break;
        case 'this_month':
          startDate = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss');
          endDate = moment().endOf('month').format('YYYY-MM-DD HH:mm:ss');
          break;
        case 'last_month':
          startDate = moment()
            .subtract(1, 'month')
            .startOf('month')
            .format('YYYY-MM-DD HH:mm:ss');
          endDate = moment()
            .subtract(1, 'month')
            .endOf('month')
            .format('YYYY-MM-DD HH:mm:ss');
          break;
      }

      setFilterModel(
        produce((draft: any) => {
          draft.map((filter: any) => {
            if (filter.field === prop) {
              filter.value.daterange = value;
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
            if (draftObj.field === 'daterange') {
              draftObj.value[prop] = moment(ev).format('YYYY-MM-DD HH:mm:ss');
            }
            return draftObj;
          });
        }),
      );
    }
  };

  const onFilterOptionChange = (ev: any, prop: string) => {
    const { value } = ev.target;

    if (value === 'daterange') {
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

  const onFetchReport = () => {
    setReportParams(
      produce((draft) => {
        draft.requestType = filter(filterModel, {
          field: 'request_type',
        })[0].value;
        draft.leadMode = filter(filterModel, { field: 'lead_mode' })[0].value;
        draft.startDate = filter(filterModel, {
          field: 'daterange',
        })[0].value.start_date;
        draft.endDate = filter(filterModel, {
          field: 'daterange',
        })[0].value.end_date;
        draft.leadTypeId = filter(filterModel, { field: 'lead_type' })[0].value;
        draft.vendorId = filter(filterModel, { field: 'vendor' })[0].value;
      }),
    );
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Table
            showFilterPanel={true}
            tableTitle=""
            description=""
            density="compact"
            getRowId={(row) => row?.id}
            rows={outboundReport || []}
            rowCount={sumBy(outboundReport, (val) => val.count)}
            columnGroupingModel={columnGroupingModel}
            experimentalFeatures={{ columnGrouping: true }}
            columns={columnsList}
            pageSizeOptions={[]}
            isFetching={isFetching}
            hideFooter={true}
            onFetchReport={() => onFetchReport()}
            onResetFilters={() => onResetFilters()}
            onFilterOptionChange={(opt, prop) =>
              onFilterOptionChange(opt, prop)
            }
            onFilterValueChange={(opt, prop) => onFilterValueChange(opt, prop)}
            selectedFilters={filterModel}
            filterMode="server"
            checkboxSelection={false}
            disableRowSelectionOnClick
            height="calc(100vh - 200px)"
            rowHeight={72}
            columnVisibilityModel={{
              rowNo: false,
            }}
          />
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={() => onViewDetails()}>View</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OutboundClientPingPostAnalysis;
