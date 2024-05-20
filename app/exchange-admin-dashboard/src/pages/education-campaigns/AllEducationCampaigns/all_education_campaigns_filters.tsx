import React, { FC, ReactElement } from 'react';
import {
  Paper,
  Box,
  TextField,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  Grid
} from '@mui/material';
import { ITable, IFilterPanel } from '../../../components/common/table/index.interface';
import { DateInputWithLabel } from '@monorepo/material-ui-components';
import AddCircle from '@mui/icons-material/AddCircle';
import moment from 'moment';

const FilterPanel: FC<IFilterPanel> = (props): ReactElement => {
  const {
    selectedFilter,
    resetProgress,
    onApplyFilters,
    onFilterValueChange,
    onFilterOptionChange,
    onFilterTextChange,
    onResetFilters,
    hideControls = false,
    error
  } = props;

  const onChangeFilterValue = (ev: any, val: string) => {
    resetProgress();
    onFilterValueChange(ev, val);
  };




  return (
    <Box component="form" position="relative" display="inline-block" zIndex={1000} sx={{ '& .MuiTextField-root': { m: 1 } }}>
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
              width: '9rem'
            }}
            slotProps={{ textField: { size: 'small' } }}
            borderStyle={{ fieldset: { border: '1px solid #BABABA' } }}
            minDate={moment().subtract(3, 'month')}
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
            minDate={moment().subtract(12, 'hours')}
          />
        </>
      )}

      {selectedFilter.field_type === 'multi-choice-check' && !hideControls && (
        <div className='checkboxWrap'>
          <FormControlLabel
            value="start"
            control={<Checkbox />}
            label="Show All"
            labelPlacement="end"
            style={{
              margin: "12px 5px 0 0"
            }}
          />
          <TextField
            id="outlined-select-options"
            select
            size="small"
            defaultValue=""
            label={selectedFilter.label}
            value={selectedFilter.value}
            onChange={(ev) => onFilterOptionChange(ev, selectedFilter.field)}
            sx={{ width: '8rem', marginRight: "0!important" }}
            InputLabelProps={{
              shrink: true,
            }}
            
          >
            {selectedFilter?.filter_options?.map((option: any) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
      )}

      {selectedFilter.field_type === 'text-filed' && !hideControls && (
        <TextField
          id="text-input"
          size="small"
          variant="outlined"
          defaultValue=""
          label={selectedFilter.label}
          value={selectedFilter.value}
          onChange={(e) => onFilterTextChange(e, selectedFilter.field)}
          sx={{ width: '10rem', marginRight: "0!important" }}
          InputLabelProps={{
            shrink: true,
          }}
          error={!!error}
            helperText={error || (selectedFilter.campaign_id && 'Invalid campaign Id ')}
        />
      )}

      {selectedFilter.field_type === 'list-lead-filter-btn' && !hideControls && (
        <>
          <Button
            size="small"
            sx={{ top: '13px !important', mx: 1, height: '35px', marginRight: "0!important" }}
            onClick={() => onApplyFilters()}
            variant="contained"
          >{selectedFilter.label}</Button>

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

      {selectedFilter.field_type === 'multi-choice' && !hideControls && (
        <TextField
          id="outlined-select-options"
          select
          size="small"
          defaultValue=""
          label={selectedFilter.label}
          value={selectedFilter.value}
          onChange={(ev) => onFilterOptionChange(ev, selectedFilter.field)}
          sx={{ width: '7rem', marginRight: "0!important" }}
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
    <Paper  elevation={0} sx={{ p: 1, m: 1 }}>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
      <Box >
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
      <Box >
      <Button onClick={props.handleClickOpen} size="small" sx={{ top: '9px!important', m: "0 0 0 8px" }} variant="contained"><AddCircle sx={{ fontSize: "1rem", mr: "5px" }}/> Add New</Button>
      </Box>
      </Box>
      
    </Paper>
  );
};
