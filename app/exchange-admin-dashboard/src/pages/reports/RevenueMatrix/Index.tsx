import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Typography, TableBody, TableCell, TableContainer, TableRow, Paper, Box } from '@mui/material';
import { useLeadTypes } from '../../../hooks';
import { useRevenueMatrixReport } from '../../../hooks/reports/useRevenueMatrix';
import { setAutoFreeze, produce } from 'immer';
import { FILTER_DATE_RANGES } from '../../../configs/constants';
import { TableFilter } from './revenue_matrix_filters';
import LinearProgressWithLabel from '../../../components/common/table/index';
import {
  ContainerStyle,
  ContentContainerStyle,
  FixedLayoutStyle,
  FooterStyle,
  GridContainerStyle,
  HeaderStyle,
  ScrollLayoutStyle
} from './revenue_matrix.style';
import TableHeaderComponent from './table_header';
import TableFooterComponent from './table_footer';
import TableBodyComponent from './table_body';
import { MuiTable } from './index.style';
import moment from 'moment';

const RevenueMatrix: FC = (): ReactElement => {
  setAutoFreeze(false);
  const [filterModel, setFilterModel] = React.useState<any>([]);
  const [fixNumbers, setFixNumbers] = useState(false);

  const { data: revenueMatrixReport, isFetching, refetch, isStale } = useRevenueMatrixReport(filterModel);
  const [newFilterModel, setNewFilterModel] = React.useState<any>([]);

  const [timer, setTimer] = useState(false)
  const [progress, setProgress] = useState(0);

  const { data: allLeadTypes } = useLeadTypes();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 5,
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (revenueMatrixReport?.normal_day_data.length > 0) {
      setTimer(true)
    }
  }, [revenueMatrixReport?.normal_day_data])

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 60000);
    if(fixNumbers) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [fixNumbers, refetch]);

  React.useEffect(() => {
    if (allLeadTypes && allLeadTypes.length > 0) {
      resetFilters();
      setFilterModel(getDefaultFilters());
      setNewFilterModel(getDefaultFilters());
    }
  }, [allLeadTypes]);

  const resetFilters = () => {
    setFilterModel(getDefaultFilters());
    setNewFilterModel(getDefaultFilters());
  };

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
        value: allLeadTypes && allLeadTypes.length > 0 ? allLeadTypes[0].lead_type_id : '',
      },
      {
        field: 'onlydaterange',
        field_type: 'onlydaterange',
        filter_options: FILTER_DATE_RANGES,
        label: 'Date range',
        value: {
          onlydaterange: 'user_defined',
          start_date: moment().startOf('month').format('YYYY-MM-DD'),
          end_date: moment().endOf('month').format('YYYY-MM-DD'),
        },
      },
      {
        field_type: 'fix-numbers-and-go',
        label: 'Fix Numbers',
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
          endDate   = moment().startOf('day').format('YYYY-MM-DD');
          break;
        case 'yesterday':
          startDate = moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD');
          endDate   = moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD');
          break;
        case 'this_week':
          startDate = moment().clone().startOf('isoWeek').format('YYYY-MM-DD');
          endDate   = moment().clone().endOf('isoWeek').format('YYYY-MM-DD');
          break;
        case 'last_week':
        startDate = moment().clone().subtract(1, 'weeks').startOf('isoWeek').format('YYYY-MM-DD');
        endDate   = moment().clone().subtract(1, 'weeks').endOf('isoWeek').format('YYYY-MM-DD');
        break;
        case 'this_month':
        startDate = moment().startOf('month').format('YYYY-MM-DD');
        endDate   = moment().endOf('month').format('YYYY-MM-DD');
        break;
        case 'last_month':
        startDate = moment().clone().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
        endDate   = moment().clone().subtract(1, 'month').endOf('month').format('YYYY-MM-DD');
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
    }
    else if(prop=='fix-numbers-and-go'){
      setFixNumbers(ev.target.checked);

    }
    else {
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

  const onApplyFilters = () =>{
    setFilterModel(newFilterModel)
  }

  const leadTypes           = revenueMatrixReport?.lead_types || [];
  const tableData           = revenueMatrixReport?.normal_day_data || [];
  const mainDataSummary     = revenueMatrixReport?.main_data_summary || {};
  const bestDayData         = revenueMatrixReport?.best_day_data || {};
  const lastSameDayData     = revenueMatrixReport?.last_same_day_data || {};
  const displayComparison   = revenueMatrixReport?.display_comparison || false;

  const tableProps = {
    tableTitle: "Daily Totals",
    tableTooltip: "Daily Totals Chart",
    dataSummary: [mainDataSummary],
    bestDayData: [bestDayData],
    lastSameDayData: [lastSameDayData],
    displayComparison: displayComparison,
    tableData: tableData
  };

  const onResetFilters = () => {
    setFilterModel([]);
    setNewFilterModel(getDefaultFilters());
    resetFilters();
  };
  return (
    <>
     <ContainerStyle sx={!timer ? {pb: "15rem"} : ''}>
      <HeaderStyle>
        <TableFilter
          lastUpdate={ revenueMatrixReport?.last_updated || ""}
          onFilterOptionChange={(opt, prop) => onFilterOptionChange(opt, prop)}
          onFilterValueChange={(opt, prop) => onFilterValueChange(opt, prop)}
          onApplyFilters={()=>onApplyFilters()}
          selectedFilters={newFilterModel}
          onResetFilters={() => onResetFilters()}
          isGoBtnClicked={isFetching}
        />
      </HeaderStyle>

      { timer ?

      <ContentContainerStyle>
        <FixedLayoutStyle>
          <TableContainer component={Paper} sx={{ margin: "2rem 0" }}>
            <MuiTable sx={{ backgroundColor: "#eceff1" }}>
              <TableBody className='table-body'>
                  <TableHeaderComponent tableProps={tableProps}/>
                  { tableData.length > 0 ? tableData.map((item, key) => {
                    return (
                      <TableRow key={key} className={`super-app-theme--${item?.row_class?.replaceAll(' ', '').replaceAll(':', '')}`}>
                        <TableCell className='text-center'>{ item?.row_no || "-"}</TableCell>
                        <TableCell className='text-center'>{ item?.date || "-"}</TableCell>
                        <TableCell className='text-center'>{ item?.total_gross_revenue || "-"}</TableCell>
                        <TableCell className='text-center'>{ item?.total_returns_received || "-"}</TableCell>
                        <TableCell className='text-center'>{ item?.net_revenue_after_returns || "-"}</TableCell>
                        <TableCell className='text-center'>{ item?.total_commission || "-"}</TableCell>
                        <TableCell className='text-center'>{ item?.total_net_profit || "-"}</TableCell>
                        <TableCell className='text-center'>{ item?.total_percentage || "-"}</TableCell>
                      </TableRow>
                    )
                  }) : <TableRow>
                        <TableCell sx={{ lineHeight: "15rem", textAlign: "center" }} colSpan={8}>No rows</TableCell>
                      </TableRow> }
                  <TableFooterComponent tableProps={tableProps}/>
              </TableBody>
            </MuiTable>
          </TableContainer>

        </FixedLayoutStyle>
        {leadTypes.length > 0 ?
          <ScrollLayoutStyle>
            <GridContainerStyle>
                <TableContainer component={Paper} sx={{ margin: "2rem 0", display: "flex" }}>
                  { leadTypes.map((lead, i) => {
                    return (
                      <MuiTable className='table-scrollable' key={i}>
                        <TableBodyComponent revenueMatrixReport={revenueMatrixReport} lead_type={lead?.lead_type} lead_label={lead?.label} displayComparison={displayComparison}/>
                      </MuiTable>
                    )
                  }) }
                </TableContainer>

          </GridContainerStyle>
        </ScrollLayoutStyle>
        : '' }
      </ContentContainerStyle> :
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

      {timer && tableData.length > 0 ? <FooterStyle>
        <Typography sx={{ fontSize: '20px', paddingLeft: '10px' }}>
          Current Forecast Gross Revenue = {revenueMatrixReport?.month_forecast}
        </Typography>

        <Typography sx={{ fontSize: '12px', paddingLeft: '10px', color: 'rgba(0, 0, 0, 0.6)' }}>
          Revenue for today is excluded from this calculation until it reaches the daily average of {revenueMatrixReport?.daily_average}
        </Typography>
      </FooterStyle> : '' }
    </ContainerStyle>
    <br/>
    </>
  );
};

export default RevenueMatrix;
