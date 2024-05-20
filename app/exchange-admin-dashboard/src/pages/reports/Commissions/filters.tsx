import React, { FC, ReactElement } from 'react';
import {
  Paper,
  Box,
  TextField,
  MenuItem,
  Button,
  Link,
  Typography
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import { ITable, IFilterPanel } from '../../../components/common/table/index.interface';
import { DateInputWithLabel } from '@monorepo/material-ui-components';
import moment from 'moment';

const FilterPanel: FC<IFilterPanel> = (props): ReactElement => {
  const {
    selectedFilter,
    resetProgress,
    onApplyFilters,
    onResetFilters,
    onFilterOptionChange,
    onFilterValueChange,
    hideControls = false,
    isGoBtnClicked=false,
  } = props;

  const onChangeFilterValue = (ev: any, val: string) => {
    resetProgress();
    onFilterValueChange(ev, val);
  };

  return (
    <Box component="form" position="relative" display="inline-block" zIndex={1000} sx={{ '& .MuiTextField-root': { m: "8px 0 8px 8px" } }}>

      {selectedFilter.field_type === 'vertical-type' && !hideControls && (
       <div className='filter-link'>
        <Typography>Vertical Type</Typography>
        <Link>Click here for Payday/Personal Loans/Payday Short Form</Link>
        <Link>Click here for Education</Link>
       </div>
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
          sx={{ width: '8.5rem'}}
          className={selectedFilter.field}
        >
          {selectedFilter?.filter_options?.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}

      {selectedFilter.field_type === 'onlydaterange' && !hideControls && (
        <>
          <DateInputWithLabel
            onChange={(e) => onChangeFilterValue(e, 'start_date')}
            value={
              selectedFilter.value
                ? moment(selectedFilter.value.start_date)
                : moment().subtract(1, 'days')
            }
            label="Start date"
            style={{
              '.MuiInputBase-input': {
                fontSize: '0.75rem',
                height: '10px',
                padding: '12px',
              },
              marginRight: 1,
              display: 'inline-block',
              width: '8.5rem'
            }}
            slotProps={{ textField: { size: 'small' } }}
            borderStyle={{ fieldset: { border: '1px solid #BABABA' } }}
            minDate={moment().subtract(10, 'year')}
          />
          <DateInputWithLabel
            onChange={(e) => onChangeFilterValue(e, 'end_date')}
            value={
              selectedFilter.value
                ? moment(selectedFilter.value.end_date)
                : moment()
            }
            label="End date"
            style={{
              '.MuiInputBase-input': {
                fontSize: '0.75rem',
                height: '10px',
                padding: '12px',
              },
              marginRight: 1,
              display: 'inline-block',
              width: '8.5rem'
            }}
            slotProps={{ textField: { size: 'small' } }}
            borderStyle={{ fieldset: { border: '1px solid #BABABA' } }}
            minDate={moment().subtract(10, 'year')}
          />
        </>
      )}

      {selectedFilter.field_type === 'filter-btn' && !hideControls && (
        <>
          { !isGoBtnClicked && <Button
            size="small"
            sx={{ top: '13px !important', mx: 1, height: '35px', marginRight: "0!important" }}
            variant="contained"
            onClick={()=>onApplyFilters()}
          >{selectedFilter.label}</Button> }

          { isGoBtnClicked &&  <LoadingButton loading variant="outlined"  size="small" sx={{ top: '13px !important', mx: 1, height: '35px' }} /> }

          <Button
            size="small"
            onClick={() => onResetFilters()}
            sx={{ top: '13px !important', mx: 1, height: '35px', backgroundColor: "#9e9e9e", color: "#fff" }}
            variant="contained"
          >
            Reset
          </Button>
        </>
      )}

      {selectedFilter.field_type === 'last-updated' && !hideControls && (
        <span className='last-updated'> Last updated <br/> 2023-12-03</span>
      )}
    </Box>
  );
};

export const TableFilter: FC<ITable> = (props): ReactElement => {
  const { selectedFilters } = props;
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10,
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
        <Box sx={{ position: "relative" }}>
          {selectedFilters?.length > 0 &&
            selectedFilters.map((filter, idx) => (
              <FilterPanel
                selectedFilter={filter}
                resetProgress={resetProgress}
                key={idx}
                {...props}
              />
            ))}
        </Box>
    </Paper>
  );
};
