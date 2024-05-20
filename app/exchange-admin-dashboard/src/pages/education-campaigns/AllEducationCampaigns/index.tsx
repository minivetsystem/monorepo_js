import React, { FC, ReactElement, useRef } from 'react';
import {
  ContainerStyle,
  HeaderContainerStyle,
} from './all_education_campaigns.style';
import { TableFilter } from './all_education_campaigns_filters';
import { FILTER_DATE_RANGES } from '../../../configs/constants';
import { MuiTable } from './index.style';
import EditIcon from '@mui/icons-material/Edit';
import { useUsersByRole } from '../../../hooks';
import { useEducationCampaignsReports, useAddEducationCampaign, useEditEducationCampaign } from '../../../hooks';
import LinearProgressWithLabel from '../../../components/common/table/index';
import { AddEducationCampaign } from '../../../components/core/educationcampaign/AddEducationCampaign';
import {
  EducationCampaignsReport,
  FromDataParams,
  ReportPrams,
  FieldRefs,
  CampaignData
} from './all_education_campaigns.model';
import {
  PaginationData,
  DEFAULT_PAGE,
  ROWS_PER_PAGE,
} from '../../../components/common/pagination/pagination';
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination,
  Button,
} from '@mui/material';
import moment from 'moment';
import { produce } from 'immer';

const EducationCampaigns: FC = (): ReactElement => {
  const [filterModel, setFilterModel] = React.useState<any>([]);
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = React.useState(ROWS_PER_PAGE);
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState('');
  const mongoDBObjectIdPattern = /^[0-9a-fA-F]{24}$/;
  const defaultReportParams = {
    start_date: '',
    end_date: '',
    limit: rowsPerPage,
    skip: page,
  };
  const getDefaultAddCampaigns = { 
    campaign_id: '',
    name: '',
    active: false,
    start_date: moment().startOf('month').format('YYYY-MM-DD'),
    commission_percentage: 0,
    buyers: [],
    vendor: '',
  };
  const [fromData, setFromData] = React.useState<FromDataParams>(
    getDefaultAddCampaigns,
  );
  const [reportParams, setReportParams] =
    React.useState<ReportPrams>(defaultReportParams);

  const fieldRefs: FieldRefs = {
    name: useRef<HTMLInputElement>(null),
    start_date: useRef<HTMLInputElement>(null),
    commission_percentage: useRef<HTMLInputElement>(null),
    buyers: useRef<HTMLInputElement>(null),
    vendor: useRef<HTMLInputElement>(null),
  };

  const { data: educationCampaignsReports,
    refetch,
    isLoading,
    isFetching
  } = useEducationCampaignsReports(reportParams);



  const { data: allVendors } = useUsersByRole({
    roleName: 'vendor',
    includeDisabled: false,
  });
  const { data: allBuyers } = useUsersByRole({
    roleName: 'client',
    includeDisabled: false,
  });

  const {
    mutate: addCampaign,
    data: addCampaignReturns,
    status: addCampaignStatus,
  } = useAddEducationCampaign();

  const {
    mutate: editCampaign,
    data: editCampaignReturns,
    status: editCampaignStatus,
  } = useEditEducationCampaign();

  const allEducationCampaigns =
    isLoading || !Array.isArray(educationCampaignsReports?.campaigns)
      ? []
      : educationCampaignsReports?.campaigns;

  const handleClose = () => {
    setFromData(getDefaultAddCampaigns);
    setOpen(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {

    setReportParams((prevParams) => ({
      ...prevParams,
      skip: newPage,
    }));
    setPage(newPage);
 
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    setReportParams((prevParams) => ({
      ...prevParams,
      limit: newRowsPerPage,
    }));

    onApplyFilters();
  };



  React.useEffect(() => {
    setFilterModel(getDefaultFilters());
    const loader = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 5,
      );
    }, 1000);
    return () => {
      clearInterval(loader);
    };
  }, []);

  const getDefaultFilters = () => {
    return [
      {
        field: 'onlydaterange',
        field_type: 'onlydaterange',
        filter_options: FILTER_DATE_RANGES,
        label: 'Date range',
        value: {
          start_date: moment().startOf('week').format('YYYY-MM-DD'),
          end_date: moment().endOf('week').format('YYYY-MM-DD'),
        },
      },
      {
        field: 'campaign-id',
        field_type: 'text-filed',
        label: 'Campaign Id',
        value: '',
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

  const onTextFieldChange = (ev: any, prop: string) => {
    if (prop === 'buyers') {
      const selectedOptions = ev;
      const newBuyersArray = [...fromData.buyers];
    
      // Remove deselected options
      fromData.buyers.forEach((buyer: string) => {
        if (!selectedOptions.includes(buyer)) {
          const index = newBuyersArray.indexOf(buyer);
          if (index !== -1) {
            newBuyersArray.splice(index, 1);
          }
        }
      });
    
      // Add newly selected options
      selectedOptions.forEach((selectedOption: string) => {
        if (!newBuyersArray.includes(selectedOption)) {
          newBuyersArray.push(selectedOption);
        }
      });
    
      setFromData({ ...fromData, buyers: newBuyersArray });
    } else if (prop === 'vendor') {
      setFromData({ ...fromData, [prop]: ev });
    } else if (prop === 'active') {
      setFromData({ ...fromData, [prop]: ev });
    } else if (prop === 'start_date') {
      setFromData({ ...fromData, [prop]: ev });
    } else {
      setFromData({ ...fromData, [prop]: ev.target.value });
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

  const onFilterTextChange = (e: any, prop: string) => {
    const value = e.target.value;
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
  };

  const onResetFilters = () => {
    setReportParams(defaultReportParams);
    setFilterModel(getDefaultFilters());
    refetch();
    setError('');
  };

  const onApplyFilters = () => {
    if (
      filterModel[1].value &&
      !mongoDBObjectIdPattern.test(filterModel[1].value)
    ) {
      setError('Invalid Campaign Id');
      return;
    }

    setError('');

    const dateFormat = 'YYYY-MM-DD';
    const startDate = moment(filterModel[0].value.start_date, dateFormat)
      .utcOffset('-06:00')
      .toISOString();
    const endDate = moment(filterModel[0].value.end_date, dateFormat)
      .utcOffset('-06:00')
      .toISOString();

    setReportParams((prevParams) => ({
      ...prevParams,
      start_date: startDate,
      end_date: endDate,
      campaign_id: filterModel[1].value,
    }));
  };


  const handleOpenAddCampModel = () => {
    setOpen(true);
  };

  const handleEditCampModel = (rowData: EducationCampaignsReport) => {
    const buyerNames = rowData.buyers.map(
      (item) => `${item.first_name} ${item.last_name}`,
    );
    const vendorName = `${rowData.vendor.first_name} ${rowData.vendor.last_name}`;

    setFromData({
      campaign_id: rowData._id,
      name: rowData.name,
      active: rowData.active,
      start_date: rowData.start_date.slice(0, 10),
      commission_percentage: rowData.commission_percentage,
      buyers: buyerNames,
      vendor: vendorName,
    });
    setOpen(true);
  };

  const handleValidation = () => {
    let isValid = true;
    for (const fieldName in fromData) {
      const fieldValue = fromData[fieldName];
  
      if (fieldName === "name" && !fieldValue) {
        if (fieldRefs[fieldName]?.current) {
          fieldRefs[fieldName].current.focus();
      
        }
        isValid = false;
        break; 
      } 
      else if (fieldName === "commission_percentage") {
        if (fieldValue !== 0 && !fieldValue) {
          if (fieldRefs[fieldName]?.current) {
            fieldRefs[fieldName].current.focus();
          }
          isValid = false;
          break; 
        }
      } 
      else if (fieldName === "buyers" && fieldValue.length === 0) {
        if (fieldRefs[fieldName]?.current) {
          fieldRefs[fieldName].current.focus();
        }
        isValid = false;
        break;
      }
      else if (fieldName === "vendor" && !fieldValue) {
        if (fieldRefs[fieldName]?.current) {
          fieldRefs[fieldName].current.focus();
        }
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  const handleSave = () => {
    const isValid = handleValidation();
    if (isValid) {
      handleSubmitCampData();
    }
  };

  const handleSubmitCampData = () => {
    setOpen(false);
    const dateFormat = 'YYYY-MM-DD';
    const startDate: string = moment(fromData.start_date, dateFormat).utcOffset('-06:00').toISOString();

  
    const campaignData: CampaignData = {
      name: fromData.name,
      active: fromData.active,
      start_date: startDate,
      commission_percentage: parseFloat(fromData.commission_percentage),
      buyers: fromData.buyers,
      vendor: fromData.vendor,
    };
  
    if (fromData.campaign_id  && mongoDBObjectIdPattern.test(fromData.campaign_id)) {
      campaignData.campaign_id = fromData.campaign_id;
      editCampaign(campaignData);
    } else {
      addCampaign(campaignData);
    }
  
    setFromData(getDefaultAddCampaigns());
};
  


  return (
    <ContainerStyle sx={{ p: '15px 15px 2rem' }}>
      <HeaderContainerStyle>
        <TableFilter
          onResetFilters={() => onResetFilters()}
          onFilterOptionChange={(opt, prop) => onFilterOptionChange(opt, prop)}
          onFilterValueChange={(opt, prop) => onFilterValueChange(opt, prop)}
          onFilterTextChange={(e, prop) => onFilterTextChange(e, prop)}
          selectedFilters={filterModel}
          onApplyFilters={() => onApplyFilters()}
          error={error}
          handleClickOpen={handleOpenAddCampModel}
        />
      </HeaderContainerStyle>
      {!isFetching ? (
        <TableContainer component={Paper}>
          <MuiTable sx={{ borderTop: '1px solid #ddd' }}>
            <TableHead className="bggray">
              <TableRow className="text-center">
                <TableCell component="th">Campaign Id</TableCell>
                <TableCell component="th">Name</TableCell>
                <TableCell component="th">Active</TableCell>
                <TableCell component="th">Start Date</TableCell>
                <TableCell component="th">Commission Percentage</TableCell>
                <TableCell component="th">Buyers Name</TableCell>
                <TableCell component="th">Vendor Name</TableCell>
                <TableCell component="th">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allEducationCampaigns && allEducationCampaigns.length > 0 ? (
                allEducationCampaigns.map((res: EducationCampaignsReport) => (
                  <TableRow key={res._id} className="text-center">
                    <TableCell component="th" scope="row">
                      {res._id}
                    </TableCell>
                    <TableCell align="right">{res.name}</TableCell>
                    <TableCell align="right">
                      {res.active ? 'Active' : 'Inactive'}
                    </TableCell>
                    <TableCell align="right">
                      {' '}
                      {res.start_date.slice(0, 10)}
                    </TableCell>
                    <TableCell align="right">
                      {res.commission_percentage}
                    </TableCell>
                    <TableCell align="right">
                      {res.buyers.map((buyer, index) => (
                        <span key={buyer._id}>
                          {buyer.first_name} {buyer.last_name}
                          {index !== res.buyers.length - 1 && ', '}
                        </span>
                      ))}
                    </TableCell>

                    <TableCell align="right">
                      {res.vendor.first_name} {res.vendor.last_name}
                    </TableCell>
                    <TableCell align="right">
                      <Button onClick={() => handleEditCampModel(res)}>
                        <EditIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    sx={{ lineHeight: '20rem', textAlign: 'center' }}
                    colSpan={9}
                  >
                    No records found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </MuiTable>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={educationCampaignsReports?.totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <LinearProgressWithLabel
            sx={{
              width: '401px',
              height: '20px',
            }}
            value={progress}
          />
        </Box>
      )}
      <AddEducationCampaign
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
        handleFieldChange={(opt, prop) => onTextFieldChange(opt, prop)}
        fromData={fromData}
        allVendors={allVendors}
        allBuyers={allBuyers}
        fieldRefs={fieldRefs}
      />
    </ContainerStyle>
  );
};

export default EducationCampaigns;
