import React, { FC, ReactElement } from 'react';
import {
  Paper,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DataGridTable } from './index.style';
import { ITable, IFilterPanel } from './index.interface';
import { DateTimeInput } from '@monorepo/material-ui-components';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import moment from 'moment';

export default function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number },
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1, position: 'relative', top: '100px' }}>
        <LinearProgress
          sx={{ height: '50px' }}
          variant="determinate"
          {...props}
        />
      </Box>
    </Box>
  );
}

const FilterPanel: FC<IFilterPanel> = (props): ReactElement => {
  const {
    selectedFilter,
    onFilterValueChange,
    onFilterOptionChange,
    hideControls = false,
  } = props;

  return (
    <Box
      component="form"
      position="relative"
      display="inline-block"
      zIndex={1000}
      sx={{ '& .MuiTextField-root': { m: 1 } }}
      noValidate
      autoComplete="off"
    >
      {selectedFilter.field_type === 'daterange' && !hideControls && (
        <>
          <TextField
            id="outlined-select-options"
            select
            size="small"
            defaultValue=""
            label={selectedFilter.label}
            value={selectedFilter.value.daterange}
            onChange={(ev) => onFilterValueChange(ev, 'daterange')}
            sx={{ maxWidth: 150, display: 'inline-block' }}
          >
            {selectedFilter?.filter_options?.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <DateTimeInput
            onChange={(e) => onFilterValueChange(e, 'start_date')}
            value={
              selectedFilter.value
                ? moment(selectedFilter.value.start_date)
                : moment().subtract(1, 'days')
            }
            label="Start date"
            style={{
              '.MuiInputBase-input': {
                fontSize: '0.75rem',
                padding: 1.1,
                width: '120px',
              },
              '.MuiOutlinedInput-root': {
                paddingRight: '0px',
              },
              marginRight: 1,
              display: 'inline-block',
            }}
            slotProps={{ textField: { size: 'small' } }}
            borderStyle={{ fieldset: { border: '1px solid #BABABA' } }}
            minDate={moment().subtract(1, 'year')}
          />
          <DateTimeInput
            onChange={(e) => onFilterValueChange(e, 'end_date')}
            value={
              selectedFilter.value
                ? moment(selectedFilter.value.end_date)
                : moment()
            }
            label="End date"
            style={{
              '.MuiInputBase-input': {
                fontSize: '0.75rem',
                padding: 1.1,
                width: '120px',
                paddingRight: '0px',
              },
              '.MuiOutlinedInput-root': {
                paddingRight: '0px',
              },
              marginRight: 1,
              display: 'inline-block',
            }}
            slotProps={{ textField: { size: 'small' } }}
            borderStyle={{ fieldset: { border: '1px solid #BABABA' } }}
            minDate={moment().subtract(1, 'year')}
          />
        </>
      )}
      {selectedFilter.field_type === 'multi-choice' && !hideControls && (
        <TextField
          id="outlined-select-options"
          select
          size="small"
          defaultValue=""
          label={selectedFilter.label}
          value={selectedFilter.value}
          onChange={(ev) => onFilterOptionChange(ev, selectedFilter.field)}
          sx={{ maxWidth: 150, minWidth: 100 }}
        >
          {selectedFilter?.filter_options?.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    </Box>
  );
};

export const Table: FC<ITable> = (props): ReactElement => {
  const {
    tableTitle,
    height,
    description,
    showFilterPanel,
    onFilterOptionChange,
    onApplyFilters,
    onResetFilters,
    onFetchReport,
    onRemoveFilter,
    selectedFilters,
    filterOptions,
    onFilterColumnChange,
    onFilterValueChange,
    isFetching,
    ...rest
  } = props;
  const [progress, setProgress] = React.useState(0);
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

  const resetProgress = () => {
    setProgress(0);
  };

  return (
    <Paper elevation={0} sx={{ p: 1, m: 1 }}>
      <Box
        mb={1}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box display="flex">
          <Typography variant="h5" fontWeight={600}>
            {tableTitle}
          </Typography>
          {description && <Typography variant="h5">{description}</Typography>}
        </Box>
        {tableTitle && <MoreVertIcon />}
      </Box>
      {showFilterPanel && selectedFilters?.length > 0 && (
        <Box>
          {selectedFilters.map((filter, idx) => (
            <FilterPanel
              selectedFilter={filter}
              resetProgress={resetProgress}
              key={idx}
              {...props}
            />
          ))}
          <Button
            size="small"
            onClick={() => onFetchReport()}
            sx={{ top: '13px !important', mx: 0, height: '35px' }}
            variant="contained"
          >
            Go
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => onResetFilters()}
            sx={{
              top: '13px !important',
              mx: 1,
              height: '35px',
              color: '#fff',
            }}
            variant="contained"
          >
            Reset
          </Button>
        </Box>
      )}
      <Box sx={{ width: '100%', height: height ?? '625', marginTop: 1 }}>
        {rest?.rowCount > 0 && !isFetching && (
          <Typography variant="subtitle2">
            {rest.startDate ? (
              <>
                Total <b>{rest.rowCount}</b> records found since{' '}
                <b>{rest.startDate}</b>
              </>
            ) : (
              <>
                Total <b>{rest.rowCount}</b> records found!
                <b>{rest.startDate}</b>
              </>
            )}
          </Typography>
        )}

        {!isFetching && (
          <DataGridTable
            {...rest}
            getRowClassName={(params) => {
              return `super-app-theme--${params?.row?.error
                ?.replaceAll(' ', '')
                .replaceAll(':', '')}`;
            }}
          />
        )}

        {isFetching && (
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
      </Box>
    </Paper>
  );
};
