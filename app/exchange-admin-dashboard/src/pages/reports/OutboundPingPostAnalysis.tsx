import React, { FC, ReactElement } from 'react';
import { Box, Grid } from '@mui/material';
import { filter } from 'lodash';
import { Table } from '../../components';
import {
  useLeadTypes,
  useOutboundPingPostReport,
  useUsersByRole,
} from '../../hooks';
import { setAutoFreeze, produce } from 'immer';
import {
  OUTBOUND_REPORT_COLUMNS,
  REQUEST_TYPES,
  EQUAL_OPERATOR,
  LEAD_MODES,
} from '../../configs/constants';
import {
  reportColumns,
  reportRevenueColumns,
  reportClientColumns,
} from './outbound_report_columns';
import moment from 'moment';

const OutboundPingPostAnalysis: FC = (): ReactElement => {
  setAutoFreeze(false);
  const [filterOptions, setFilterOptions] = React.useState<any>({
    columns: [],
    operators: [],
  });
  const [timestamp, setTimestamp] = React.useState('');
  const [selectedFilters, setSelectedFilters] = React.useState<any>([]);
  const [filterModel, setFilterModel] = React.useState<any>([]);

  const { data: outboundReport, isFetching } = useOutboundPingPostReport(
    filterModel,
    timestamp,
  );

  const { data: allVendors } = useUsersByRole({
    roleName: 'vendor',
    includeDisabled: false,
  });

  const { data: allLeadTypes } = useLeadTypes();

  const resetFilters = () => {
    setSelectedFilters([
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
        operators: EQUAL_OPERATOR,
        operator: '=',
        value:
          allLeadTypes && allLeadTypes.length > 0 ? allLeadTypes[0]._id : '',
        isRemovable: false,
      },
      {
        field: 'daterange',
        field_type: 'daterange',
        operators: EQUAL_OPERATOR,
        operator: '=',
        value: {
          start_date: moment().subtract(1, 'day').format('YYYY-MM-DD'),
          end_date: moment().format('YYYY-MM-DD'),
        },
        isRemovable: false,
      },
      {
        field: 'lead_mode',
        field_type: 'multi-choice',
        operators: EQUAL_OPERATOR,
        filter_options: LEAD_MODES,
        operator: '=',
        value: LEAD_MODES[0].value,
        isRemovable: false,
      },
    ]);
  };

  React.useEffect(() => {
    setFilterOptions({
      columns: OUTBOUND_REPORT_COLUMNS,
      operators: [],
      value: '',
      field_type: '',
      filter_options: [],
    });
    resetFilters();
  }, [allLeadTypes]);

  const columnsList = reportColumns();

  const revenueColumnsList = reportRevenueColumns();

  const clientColumnsList = reportClientColumns();

  const onFilterColumnChange = (ev: any) => {
    const { value } = ev.target;

    let field_type = '';
    let filter_options = [];
    if (value === 'request_type') {
      filter_options = REQUEST_TYPES;
      field_type = 'multi-choice';
      setFilterOptions(
        produce((draft: any) => {
          draft.operators = EQUAL_OPERATOR;
        }),
      );
      setSelectedFilters([
        ...selectedFilters,
        {
          field: value,
          field_type: field_type,
          filter_options: filter_options,
          operators: EQUAL_OPERATOR,
          operator: '',
          value: '',
          isRemovable: true,
        },
      ]);
    } else if (value === 'lead_type') {
      filter_options = allLeadTypes.map((type: any) => ({
        label: type.lead_type,
        value: type._id,
      }));
      field_type = 'multi-choice';
      setFilterOptions(
        produce((draft: any) => {
          draft.operators = EQUAL_OPERATOR;
        }),
      );
      setSelectedFilters([
        ...selectedFilters,
        {
          field: value,
          field_type: field_type,
          filter_options: filter_options,
          operators: EQUAL_OPERATOR,
          operator: '',
          value: '',
          isRemovable: true,
        },
      ]);
    } else if (value === 'vendor') {
      filter_options = allVendors.map((vendor: any) => ({
        label: `${vendor.first_name} ${vendor.last_name}`,
        value: vendor._id,
      }));
      field_type = 'multi-choice';
      setFilterOptions(
        produce((draft: any) => {
          draft.operators = EQUAL_OPERATOR;
        }),
      );
      setSelectedFilters([
        ...selectedFilters,
        {
          field: value,
          field_type: field_type,
          filter_options: filter_options,
          operators: EQUAL_OPERATOR,
          operator: '',
          value: '',
          isRemovable: true,
        },
      ]);
    } else if (value === 'daterange') {
      field_type = 'daterange';
      setFilterOptions(
        produce((draft: any) => {
          draft.operators = EQUAL_OPERATOR;
        }),
      );
      setSelectedFilters([
        ...selectedFilters,
        {
          field: 'daterange',
          field_type: 'daterange',
          operators: EQUAL_OPERATOR,
          operator: '=',
          value: '',
          isRemovable: true,
        },
      ]);
    }
  };

  const onFilterOperatorChange = (ev: any, prop: string) => {
    const { value } = ev.target;

    setSelectedFilters(
      produce((draft: any) => {
        draft.map((filter: any) => {
          if (filter.field === prop) {
            filter.operator = value;
          }
          return filter;
        });
      }),
    );
  };

  const onFilterValueChange = (ev: any, prop: string) => {
    if (ev.target?.value) {
      const { value } = ev.target;

      setSelectedFilters(
        produce((draft: any) => {
          draft.map((filter: any) => {
            if (filter.field === prop) {
              filter.value = value;
            }
            return filter;
          });
        }),
      );
    } else {
      setSelectedFilters(
        produce((draft: any) => {
          draft = draft.map((draftObj: any) => {
            if (draftObj.field === 'daterange') {
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

    if (value === 'daterange') {
      setSelectedFilters(
        produce((draft: any) => {
          draft[0].value = value;
        }),
      );
    } else {
      setSelectedFilters(
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

  const onApplyFilters = () => {
    setFilterModel(selectedFilters);
    setTimestamp(Date.now().toString());
  };

  const onResetFilters = () => {
    setFilterModel([]);
    resetFilters();
  };

  const onRemoveFilter = (field: string) => {
    setSelectedFilters(
      filter(selectedFilters, (fltr) => {
        if (fltr.field !== field) {
          return fltr;
        }
      }),
    );
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Table
            showFilterPanel={true}
            density="compact"
            getRowId={(row) => row?.id}
            rows={outboundReport?.data || []}
            filterOptions={filterOptions}
            columns={columnsList}
            loading={isFetching}
            hideFooter={true}
            onApplyFilters={() => onApplyFilters()}
            onResetFilters={() => onResetFilters()}
            onRemoveFilter={(field) => onRemoveFilter(field)}
            onFilterOptionChange={(opt, prop) =>
              onFilterOptionChange(opt, prop)
            }
            onFilterColumnChange={(opt) => onFilterColumnChange(opt)}
            onFilterOperatorChange={(opt, prop) =>
              onFilterOperatorChange(opt, prop)
            }
            onFilterValueChange={(opt, prop) => onFilterValueChange(opt, prop)}
            selectedFilters={selectedFilters}
            filterMode="server"
            checkboxSelection={false}
            disableRowSelectionOnClick
            height="150px"
            rowHeight={72}
          />
          <Table
            showFilterPanel={false}
            density="compact"
            getRowId={(row) => row?.id}
            rows={
              outboundReport?.data.length > 0
                ? [
                    {
                      id: 1,
                      gross_revenue: outboundReport?.gross_revenue,
                      returned_revenue: outboundReport?.returned_revenue,
                      net_revenue: outboundReport?.net_revenue,
                      total_cost: outboundReport?.total_cost,
                      returned_cost: outboundReport?.returned_cost,
                      net_cost: outboundReport?.net_cost,
                      net_profit: outboundReport?.net_profit,
                      avg_revenue_per_lead:
                        outboundReport?.avg_revenue_per_lead,
                    },
                  ]
                : []
            }
            hideFooter={true}
            filterOptions={filterOptions}
            experimentalFeatures={{ columnGrouping: true }}
            columns={revenueColumnsList}
            loading={isFetching}
            onApplyFilters={() => onApplyFilters()}
            onResetFilters={() => onResetFilters()}
            onFilterOptionChange={() => null}
            onFilterColumnChange={() => null}
            onFilterOperatorChange={() => null}
            onFilterValueChange={() => null}
            selectedFilters={selectedFilters}
            filterMode="server"
            checkboxSelection={false}
            disableRowSelectionOnClick
            height="101px"
            rowHeight={72}
          />
          <Table
            showFilterPanel={false}
            density="compact"
            sx={{ fontSize: '10px' }}
            getRowId={(row) => row?.client_id}
            rows={outboundReport?.clients || []}
            hideFooter={true}
            filterOptions={filterOptions}
            experimentalFeatures={{ columnGrouping: true }}
            columns={clientColumnsList}
            loading={isFetching}
            onApplyFilters={() => onApplyFilters()}
            onResetFilters={() => onResetFilters()}
            onFilterOptionChange={() => null}
            onFilterColumnChange={() => null}
            onFilterOperatorChange={() => null}
            onFilterValueChange={() => null}
            selectedFilters={selectedFilters}
            filterMode="server"
            checkboxSelection={false}
            disableRowSelectionOnClick
            height="200px"
            rowHeight={72}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OutboundPingPostAnalysis;
