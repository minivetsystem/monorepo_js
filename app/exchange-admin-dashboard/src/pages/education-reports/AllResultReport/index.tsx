import React, { FC, ReactElement } from 'react';
import { useEducationResultReports } from '../../../hooks';
import {
  ContainerStyle,
  HeaderContainerStyle,
} from './all_result_report.style';
import LinearProgressWithLabel from '../../../components/common/table/index';
import { TableFilter } from './all_result_report_filters';
import { FILTER_DATE_RANGES } from '../../../configs/constants';
import { MuiTable } from './index.style';
import { Box, Link } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import ReactJson from 'react-json-view';
import { Props, ReportPrams, RowData } from './all_result.model';

import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TablePagination,
} from '@mui/material';
import moment from 'moment';
import {
  PaginationData,
  DEFAULT_PAGE,
  ROWS_PER_PAGE,
} from '../../../components/common/pagination/pagination';
import { produce } from 'immer';

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

const mongoDBObjectIdPattern = /^[0-9a-fA-F]{24}$/;
const AllResultReport: FC<Props> = (): ReactElement => {
  const [filterModel, setFilterModel] = React.useState<any>([]);
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = React.useState(ROWS_PER_PAGE);
  const [open, setOpen] = React.useState(false);
  const [rowData, setRowData] = React.useState<RowData>({
    resultRequest: null,
    resultResponce: null,
  });
  const [buttonClicked, setButtonClicked] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState('');

  const defaultReportParams = {
    start_date: '',
    end_date: '',
    limit: rowsPerPage,
    skip: page,
    search_id: '',
  };
  const [reportParams, setReportParams] =
    React.useState<ReportPrams>(defaultReportParams);

  const {
    data: educationResultReports,
    refetch,
    isLoading,
    isFetching,
  } = useEducationResultReports(reportParams);

  const handleClickOpen = (data: RowData, buttonName: string) => {
    setRowData(data);
    setButtonClicked(buttonName);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const allResultReport =
    isLoading || !Array.isArray(educationResultReports?.results)
      ? []
      : educationResultReports?.results

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
          start_date: moment().startOf('month').format('YYYY-MM-DD'),
          end_date: moment().format('YYYY-MM-DD'),
        },
      },
      {
        field: 'search-id',
        field_type: 'text-filed',
        label: 'Search Id',
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

  const onResetFilters = () => {
    setReportParams(defaultReportParams);
    setFilterModel(getDefaultFilters());
    refetch();
    setError('');
  };

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setReportParams((prevParams) => ({
      ...prevParams,
      skip: newPage,
    }));
    setPage(newPage);
  };

  // Handle rows per page change
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

  const onApplyFilters = () => {
    if (
      filterModel[1].value &&
      !mongoDBObjectIdPattern.test(filterModel[1].value)
    ) {
      setError('Invalid search Id');
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
      search_id: filterModel[1].value,
    }));
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
        />
      </HeaderContainerStyle>

      {!isFetching ? (
        <TableContainer component={Paper}>
          <MuiTable sx={{ borderTop: '1px solid #ddd' }}>
            <TableHead className="bggray">
              <TableRow className="text-center">
                <TableCell component="th">Date</TableCell>
                <TableCell component="th">Email</TableCell>
                <TableCell component="th">Phone Number</TableCell>
                <TableCell component="th">Success / Failure</TableCell>
                <TableCell component="th">Vendor</TableCell>
                <TableCell component="th">Test Or Live</TableCell>
                <TableCell component="th">Search Request</TableCell>
                <TableCell component="th">Search Response</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allResultReport && allResultReport?.length > 0 ? (
                allResultReport.map((res: any) => (
                  <TableRow key={res._id} className="text-center">
                    <TableCell align="right">
                      {res.search_id.timestamp.slice(0, 10)}
                    </TableCell>
                    <TableCell align="right">
                      {res.search_id.lead.email}
                    </TableCell>
                    <TableCell align="right">
                      {res.search_id.lead.phone}
                    </TableCell>
                    <TableCell align="right">
                      {res ? 'Success' : 'Failure'}
                    </TableCell>
                    <TableCell align="right">
                      {res.search_id.education_campaign_id}
                    </TableCell>
                    <TableCell align="right">
                      {res.test ? 'Test' : 'Live'}
                    </TableCell>
                    <TableCell align="right">
                      {' '}
                      <Link
                        tabIndex={0}
                        component="button"
                        onClick={() =>
                          handleClickOpen(
                            { resultRequest: res, resultResponce: null },
                            'search_Request',
                          )
                        }
                      >
                        Click here
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      {' '}
                      <Link
                        tabIndex={0}
                        component="button"
                        onClick={() =>
                          handleClickOpen(
                            { resultRequest: null, resultResponce: res.offers },
                            'search_response',
                          )
                        }
                      >
                        Click here
                      </Link>
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
            count={educationResultReports?.totalCount}
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            width: 800,
            height: 500,
            overflow: 'auto',
            fontSize: '12px',
            padding: '10px',
            margin: '0px',
          }}
        >
          <CloseOutlined
            sx={{ float: 'right', cursor: 'pointer' }}
            onClick={handleClose}
          />
          <Box sx={{ marginTop: 2 }}>
            {buttonClicked === 'search_Request' && rowData.resultRequest && (
              <ReactJson src={rowData.resultRequest} />
            )}
            {buttonClicked === 'search_response' && rowData.resultResponce && (
              <ReactJson src={rowData.resultResponce} />
            )}
          </Box>
        </Box>
      </Modal>
    </ContainerStyle>
  );
};

export default AllResultReport;
