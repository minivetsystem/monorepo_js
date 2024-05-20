import React, { FC, ReactElement } from 'react';
import { useLeadTypes, useUsersByRole, useRegenerateSendReturnsFile } from '../../../hooks';
import { setAutoFreeze, produce } from 'immer';
import { TableFilter } from './filters';
import TopTableComponent from './top_table';
import { FILTER_PERIOD_MONTH } from '../../../configs/constants';
import { ContainerStyle, HeaderContainerStyle } from './style';
import { useReturnsSuiteReport } from '../../../hooks/reports/useReturnsSuite';
import LinearProgressWithLabel from '../../../components/common/table/index';
import { useSelector } from 'react-redux';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Box
} from '@mui/material';
import { MuiTable } from './index.style';

const ReturnsSuiteAnalysis: FC = (): ReactElement => {
  setAutoFreeze(false);
  const [filterModel, setFilterModel] = React.useState<any>([]);
  const [newFilterModel, setNewFilterModel] = React.useState<any>([]);
  const [progress, setProgress] = React.useState(0);

  const { data: allLeadTypes } = useLeadTypes();

  const { data: allClients } = useUsersByRole({
    roleName: 'client',
    includeDisabled: false,
  });

  const userState = useSelector((state: any) => state.user);

  const { mutate: regenerateSendReturnsFile, isSuccess: isSuccessRegenerate } = useRegenerateSendReturnsFile();

  const { data: returnsSuiteReport, isFetching, refetch } = useReturnsSuiteReport(filterModel);

  const summaryData = returnsSuiteReport?.summary || [];
  const historyData = returnsSuiteReport?.history || [];

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
  }, [allLeadTypes, allClients]);

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

  React.useEffect(()=> {
    refetch();
  }, [isSuccessRegenerate])

  const startYear       = 2014;
  const currentDate     = new Date();
  const endYear         = currentDate.getFullYear();
  const currentMonth    = currentDate.getMonth();
  const lastMonth       = currentMonth < 10 ? `0${currentMonth}` : currentMonth;
  const daysInMonth     = new Date(endYear, lastMonth, 0).getDate();

  const filterOptions = Array.from({ length: endYear - startYear + 1 }, (_, index) => {
    const year = startYear + index;
    return { label: year.toString(), value: year.toString() };
  });

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
        label: 'Lead Type',
        value:
          allLeadTypes && allLeadTypes.length > 0 ? allLeadTypes[0].lead_type_id : '',
      },
      {
        field: 'lead_buyer',
        field_type: 'multi-choice',
        filter_options: allClients
          ? allClients.map((client: any) => ({
              label: `${client.first_name} ${client.last_name}`,
              value: client._id
            }))
          : [],
        label: 'Lead Buyer',
        value: '',
      },
      {
        field: 'period_month',
        field_type: 'multi-choice',
        filter_options: FILTER_PERIOD_MONTH,
        label: 'Period Month',
        value: lastMonth,
      },
      {
        field: 'period_year',
        field_type: 'multi-choice',
        filter_options: filterOptions,
        label: 'Period Year',
        value: endYear,
      },
      {
        field: 'start_date',
        field_type: 'filter-start-end-date',
        filter_options: [],
        label: 'Start Date',
        value: endYear +'-'+lastMonth+'-01',
      },
      {
        field: 'end_date',
        field_type: 'filter-start-end-date',
        filter_options: [],
        label: 'End Date',
        value: endYear +'-'+lastMonth+'-'+daysInMonth,
      },
      {
        field: 'go_btn',
        field_type: 'filter-btn',
        filter_options: [],
        label: 'Go',
        value: "",
      },
      {
        field: 'returns-period',
        field_type: 'returns-period',
        filter_options: [],
        label: '',
        value: "",
      },
    ];
  };

  const onFilterOptionChange = (ev: any, prop: string) => {
    const { value } = ev.target;
    const dateString = newFilterModel?.[4]?.value
    const [yearStr, monthStr ] = dateString.split('-')
    const days = new Date(value.length > 2 ? value : yearStr, value.length === 2 ? value : monthStr, 0).getDate();

    if (prop === 'period_month') {
      setNewFilterModel(
        produce((draft: any) => {
          draft.map((filter: any) => {
            if (filter.field === 'start_date') {
              filter.value = yearStr+"-"+value+"-01";
            }
            if (filter.field === 'end_date') {
              filter.value = yearStr+"-"+value+"-"+days;
            }
            if (filter.field === prop) {
              filter.value = value;
            }
            return filter;
          });
        }),
      );

    }else if (prop === 'period_year') {
      setNewFilterModel(
        produce((draft: any) => {
          draft.map((filter: any) => {
            if (filter.field === 'start_date') {
              filter.value = value+"-"+monthStr+"-01";
            }
            if (filter.field === 'end_date') {
              filter.value = value+"-"+monthStr+"-"+days;
            }
            if (filter.field === prop) {
              filter.value = value;
            }
            return filter;
          });
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

  const onRegenerateApply = (props:any) => {
    props.added_by = userState?.user?._id;
    regenerateSendReturnsFile(props);
  }

  return (
    <ContainerStyle sx={isFetching ? {pb: "15rem"} : ''}>
      <HeaderContainerStyle>
          <TableFilter
            onResetFilters={() => onResetFilters()}
            onFilterOptionChange={(opt, prop) =>
              onFilterOptionChange(opt, prop)
            }
            selectedFilters={newFilterModel}
            onApplyFilters={()=>onApplyFilters()}
            isGoBtnClicked={isFetching}
          />
      </HeaderContainerStyle>

      { !isFetching ? <>
        <TopTableComponent summaryData={summaryData} newFilterModel={newFilterModel} onSuccess={()=> refetch()}/>
        <TableContainer component={Paper}>
          <MuiTable sx={{ borderTop: "1px solid #ddd" }}>
            <TableHead className='bggray'>
              <TableRow className='text-center'>
                <TableCell colSpan={9} align='center' component="th">Returns File History</TableCell>
              </TableRow>
              <TableRow className='text-center'>
                <TableCell component="th">Row #</TableCell>
                <TableCell component="th">Lead Type</TableCell>
                <TableCell component="th">Vendor Name</TableCell>
                <TableCell component="th">Returns Period</TableCell>
                <TableCell component="th">When Generated</TableCell>
                <TableCell component="th">Generated By</TableCell>
                <TableCell component="th" className='send-to-col'>Sent To</TableCell>
                <TableCell component="th"># Returns</TableCell>
                <TableCell component="th">Regenerate and Send Returns File</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            { historyData.length > 0 ? historyData.map((item, key) => {
              return (
                  <TableRow key={key} className='text-center'>
                    <TableCell>{item.row_no}</TableCell>
                    <TableCell>{item.lead_type}</TableCell>
                    <TableCell>{item.vendor_name}</TableCell>
                    <TableCell>{item.return_period}</TableCell>
                    <TableCell>{item.generated_on}</TableCell>
                    <TableCell>{item.generated_by}</TableCell>
                    <TableCell className='send-to-col'>{item.sent_to}</TableCell>
                    <TableCell>{item.no_of_leads}</TableCell>
                    <TableCell><Link onClick={()=>onRegenerateApply({ history_id: item._id })} sx={{ cursor: "pointer" }}>Regenerate and Send Returns File</Link></TableCell>
                  </TableRow>
                )
              }) : <TableRow>
                <TableCell sx={{ lineHeight: "1rem", textAlign: "center" }} colSpan={9}>No rows</TableCell>
              </TableRow> }
            </TableBody>
          </MuiTable>
        </TableContainer>
      </>
      :
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
