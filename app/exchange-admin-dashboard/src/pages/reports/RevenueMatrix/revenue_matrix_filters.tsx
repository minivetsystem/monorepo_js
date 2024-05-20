import React, { FC, ReactElement } from 'react';
import { Paper, Box, Typography, TextField, MenuItem, Button, Checkbox, FormControlLabel } from '@mui/material';
import { ITable, IFilterPanel } from '../../../components/common/table/index.interface';
import { DateInputWithLabel } from '@monorepo/material-ui-components';
import {LoadingButton} from '@mui/lab';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import moment from 'moment';

function LinearProgressWithLabel(
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
      <Box sx={{ minWidth: 35, position: 'relative', top: '100px' }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const FilterPanel: FC<IFilterPanel> = (props): ReactElement => {
  const {
    selectedFilter,
    resetProgress,
    onFilterValueChange,
    onFilterOptionChange,
    onApplyFilters,
    onResetFilters,
    hideControls = false,
    isGoBtnClicked=false,
    lastUpdate
  } = props;

  const onChangeFilterValue = (ev: any, val: string) => {
    resetProgress();
    onFilterValueChange(ev, val);
  };

  return (
    <Box component="form" position="relative" display="inline-block" zIndex={1000} sx={{ '& .MuiTextField-root': { m: 1 } }} noValidate autoComplete="off">
      {selectedFilter.field_type === 'onlydaterange' && !hideControls && (
        <>
        <TextField
            id="outlined-select-options"
            select
            size="small"
            defaultValue=""
            label={selectedFilter.label}
            value={selectedFilter.value.onlydaterange}
            onChange={(ev) => onChangeFilterValue(ev, 'onlydaterange')}
            sx={{ width: '7rem', margin: "8px 0px!important" }}
          >
            {selectedFilter?.filter_options?.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
              width: '9rem'
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
              width: '9rem'
            }}
            slotProps={{ textField: { size: 'small' } }}
            borderStyle={{ fieldset: { border: '1px solid #BABABA' } }}
            minDate={moment().subtract(10, 'year')}
          />
        </>
      )}

      {selectedFilter.field_type === 'fix-numbers-and-go' && !hideControls && (
        <>
        {
          !isGoBtnClicked && <Button
            size="small"
            sx={{ top: '13px !important', mx: 1, height: '35px' }}
            variant="contained"
            onClick={()=>onApplyFilters()}
          >Go</Button>
        }
          {
            isGoBtnClicked &&  <LoadingButton loading variant="outlined"  size="small"
                      sx={{ top: '13px !important', mx: 1, height: '35px' }}>
          </LoadingButton>
          }

          <Button
            size="small"
            onClick={() => onResetFilters()}
            sx={{ top: '13px !important', mx: 1, ml: 0, height: '35px', backgroundColor: "#9e9e9e", color: "#fff" }}
            variant="contained"
          >
            Reset
          </Button>

          <FormControlLabel
            onChange={(ev) => onFilterOptionChange(ev, selectedFilter.field_type)}
            control={<Checkbox sx={{ color: 'primary.main' }} variant="outlined"/>}
            label={selectedFilter.label}
            labelPlacement="start"
            sx={{ position: "relative", top: '13px', marginLeft: '0px!important' }}
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
          sx={{ width: '8rem' }}
        >
          {selectedFilter?.filter_options?.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}

      {selectedFilter.field_type === 'last-updated' && lastUpdate && !hideControls && (
        <span className='last-updated'>Last updated <br/>{lastUpdate}</span>
      )}
    </Box>
  );
};

export const TableFilter: FC<ITable> = (props): ReactElement => {
  const { selectedFilters, isGoBtnClicked } = props;

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
                isGoBtnClicked={isGoBtnClicked}
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
