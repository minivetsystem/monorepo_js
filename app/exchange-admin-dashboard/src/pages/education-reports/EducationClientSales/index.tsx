import React, { FC, ReactElement } from 'react';
import { useLeadTypes, useUsersByRole } from '../../../hooks';
import { ContainerStyle, HeaderContainerStyle } from './edu_client_sales_filters.style';
import { TableFilter } from './edu_client_sales_filters';
import { setAutoFreeze, produce } from 'immer';
import { FILTER_DATE_RANGES, LEAD_MODES } from '../../../configs/constants';
import { MuiTable } from './index.style';
import {
    List,
    Popover,
    ListItem,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Table
  } from '@mui/material';
import moment from 'moment';

function createData(
    client_name: string,
    client_id: number,
    Total_offers_sold: number,
    Net_Paid_To_Vendor: number,
    Total_Commission: number,
    Gross_Sales: number,
  ) {
    return { client_name, client_id, Total_offers_sold, Net_Paid_To_Vendor, Total_Commission, Gross_Sales };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 89),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 89),
    createData('Eclair', 262, 16.0, 24, 6.0, 89),
    createData('Cupcake', 305, 3.7, 67, 4.3, 89),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 89),
  ];


const EducationClientSales: FC = (): ReactElement => {
    const [filterModel, setFilterModel] = React.useState<any>([]);




    const { data: allClients } = useUsersByRole({
        roleName: 'client',
        includeDisabled: false,
    });

    React.useEffect(() => {

        resetFilters();
        setFilterModel(getDefaultFilters());

    }, [allClients]);

   

    const getDefaultFilters = () => {
        return [
          
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
            field: 'clientid',
            field_type: 'multi-choice-check',
            filter_options: allClients
              ? allClients.map((client: any) => ({
                  label: `${client.first_name} ${client.last_name}`,
                  value: client._id,
                }))
              : [],
            label: "Client Id",
            value: ''
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
    const resetFilters = () => {
        setFilterModel(getDefaultFilters());
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

            <TableContainer component={Paper}>
            <MuiTable sx={{ borderTop: "1px solid #ddd" }}>
        <TableHead className='bggray'>
          <TableRow className='text-center'>
            <TableCell>Client Name</TableCell>
            <TableCell component="th">Client ID</TableCell>
            <TableCell component="th">Total Offers Sold</TableCell>
            <TableCell component="th">Net Paid To Vendor</TableCell>
            <TableCell component="th">Total Commission</TableCell>
            <TableCell component="th">Gross Sales</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.client_name}
              className='text-center'
            >
              <TableCell component="th" scope="row">
                {row.client_name}
              </TableCell>
              <TableCell align="right">{row.client_id}</TableCell>
              <TableCell align="right">{row.Total_offers_sold}</TableCell>
              <TableCell align="right">{row.Net_Paid_To_Vendor}</TableCell>
              <TableCell align="right">{row.Total_Commission}</TableCell>
              <TableCell align="right">{row.Gross_Sales}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>

        </ContainerStyle>
    )
}

export default EducationClientSales