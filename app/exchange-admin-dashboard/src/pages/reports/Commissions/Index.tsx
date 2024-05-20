import React, { FC, ReactElement } from 'react';
import { useLeadTypes } from '../../../hooks';
import { setAutoFreeze, produce } from 'immer';
import { TableFilter } from './filters';
import TableComponent from './table';
import { FILTER_DATE_RANGES } from '../../../configs/constants';
import { ContainerStyle, HeaderContainerStyle } from './style';
import LinearProgressWithLabel from '../../../components/common/table/index';
import { Box } from '@mui/material';
import moment from 'moment';

const ReturnsSuiteAnalysis: FC = (): ReactElement => {
  setAutoFreeze(false);
  const [filterModel, setFilterModel] = React.useState<any>([]);
  const [newFilterModel, setNewFilterModel] = React.useState<any>([]);
  const [progress, setProgress] = React.useState(0);

  const { data: allLeadTypes, isFetching, refetch } = useLeadTypes();

  const summaryData = [
    {"row_no": 1, last: "Monthly net 15"},
    {"row_no": 2, last: ""},
    {"row_no": 3, last: "online-mortgage-loans.com/ www.mortgageratespro.com"},
    {"row_no": 4, last: ""},
    {"row_no": 5, last: ""},
    {"row_no": 6, last: ""},
    {"row_no": 7, last: ""},
    {"row_no": 8, last: "Capped at 10% (Return cap does not apply to Fraud)"},
  ];

  const resetFilters = () => {
    setFilterModel(getDefaultFilters());
    setNewFilterModel(getDefaultFilters());
  };

  React.useEffect(() => {
    if (allLeadTypes && allLeadTypes.length > 0) {
      resetFilters();
      setFilterModel(getDefaultFilters());
      setNewFilterModel(getDefaultFilters());
    }
  }, [allLeadTypes]);

  React.useEffect(() => {
    const isFetching = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 5,
      );
    }, 800);
    return () => {
      clearInterval(isFetching);
    };
  }, []);

  const getDefaultFilters = () => {
    return [
      {
        field: 'vertical_type',
        field_type: 'vertical-type',
        filter_options: [],
        label: 'Vertical Type',
        value: "",
      },
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
        label: 'Sales Person',
        value:
          allLeadTypes && allLeadTypes.length > 0 ? allLeadTypes[0].lead_type_id : '',
      },
      {
        field: 'date_range',
        field_type: 'multi-choice',
        filter_options:FILTER_DATE_RANGES,
        label: 'Date range',
        value: 'user_defined'
      },
      {
        field: 'onlydaterange',
        field_type: 'onlydaterange',
        filter_options: FILTER_DATE_RANGES,
        label: 'Date range',
        value: {
          start_date: moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
          end_date: moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD'),
        },
      },
      {
        field: 'go_btn',
        field_type: 'filter-btn',
        filter_options: [],
        label: 'Go',
        value: "",
      },
      {
        field: 'last-updated',
        field_type: 'last-updated',
        filter_options: [],
        label: '',
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
        case 'this_week':
          startDate = moment().startOf('week').format('YYYY-MM-DD');
          endDate = moment().endOf('week').format('YYYY-MM-DD');
          break;
        case 'last_week':
        startDate = moment().clone().subtract(7, 'days').startOf('week').format('YYYY-MM-DD');
        endDate = moment().clone().subtract(1, 'days').endOf('week').format('YYYY-MM-DD');
        break;
        case 'this_month':
        startDate = moment().startOf('month').format('YYYY-MM-DD');
        endDate = moment().endOf('month').format('YYYY-MM-DD');
        break;
        case 'last_month':
        startDate = moment().clone().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
        endDate = moment().clone().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
        break;
      }

      setNewFilterModel(
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
      setNewFilterModel(
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
      setNewFilterModel(
        produce((draft: any) => {
          draft[0].value = value;
        }),
      );
    } else {
      setNewFilterModel(
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
    setNewFilterModel(getDefaultFilters());
    resetFilters();
  };

  const onApplyFilters = () =>{
    setFilterModel(newFilterModel)
  }

  return (
    <ContainerStyle sx={isFetching ? {pb: "15rem"} : ''}>
      <HeaderContainerStyle>
          <TableFilter
            onResetFilters={() => onResetFilters()}
            onFilterOptionChange={(opt, prop) => onFilterOptionChange(opt, prop)}
            onFilterValueChange={(opt, prop) => onFilterValueChange(opt, prop)}
            selectedFilters={newFilterModel}
            onApplyFilters={()=>onApplyFilters()}
            isGoBtnClicked={isFetching}
          />
      </HeaderContainerStyle>

      { !isFetching ? <TableComponent summaryData={summaryData} newFilterModel={newFilterModel} onSuccess={()=> refetch()}/> :
      <Box display="flex" justifyContent="center" alignItems="center">
        <LinearProgressWithLabel
          sx={{
            width: '401px',
            height: '20px',
          }}
          value={progress}
        />
      </Box>
    }
    </ContainerStyle>
  );
};

export default ReturnsSuiteAnalysis;
