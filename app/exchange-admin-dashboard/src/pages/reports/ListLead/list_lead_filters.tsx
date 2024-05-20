import React, { FC, ReactElement } from 'react';
import { Paper, Box, Typography, TextField, MenuItem, Button, Tooltip, Checkbox, FormControlLabel } from '@mui/material';
import { ITable, IFilterPanel } from '../../../components/common/table/index.interface';
import { DateInputWithLabel } from '@monorepo/material-ui-components';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import moment from 'moment';
import { CloudDownload, Download, Refresh } from '@mui/icons-material';


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
    hideControls = false,
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
            sx={{ width: '7rem', marginRight: "0px!important" }}
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
              width: '8rem'
            }}
            slotProps={{ textField: { size: 'small' } }}
            borderStyle={{ fieldset: { border: '1px solid #BABABA' } }}
            minDate={moment().subtract(1, 'month')}
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
              width: '8rem'
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

      {selectedFilter.field_type === 'list-lead-filter' && !hideControls && (
        <TextField
          size="small"
          id="outlined-q"
          label="Name/Phone/Email/Universal Leadid"
          sx={{ width: '12rem', marginRight: "0!important" }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}

      {selectedFilter.field_type === 'list-lead-filter-btn' && !hideControls && (
        <Button
          size="small"
          sx={{ top: '13px !important', mx: 1, height: '35px', marginRight: "0!important" }}
          variant="contained"
        >{selectedFilter.label}</Button>
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
    <Paper elevation={0} sx={{ p: 1, m: 1 }}>
        <Box>
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

export const TableAction: FC<ITable> = (props): ReactElement => {
  return (
    <Paper elevation={0} sx={{ float: "right" }}>
        <Box>
          <Tooltip title="Export All Records In Backround">
            <Button size="small" sx={{ top: '9px!important', m: "0 0 0 8px", minWidth: "0px!important" }} variant="contained"><CloudDownload sx={{ fontSize: "1rem" }}/></Button>
          </Tooltip>

          <Tooltip title="Export Selected">
            <Button size="small" sx={{ top: '9px!important', m: "0 0 0 8px", minWidth: "0px!important" }} variant="contained"><Download sx={{ fontSize: "1rem" }}/></Button>
          </Tooltip>

          <Tooltip title="Export All Records">
            <Button size="small" sx={{ top: '9px!important', m: "0 0 0 8px", minWidth: "0px!important" }} variant="contained"><CloudDownload sx={{ fontSize: "1rem" }}/></Button>
          </Tooltip>

          <Tooltip title="Refresh Current Records">
            <Button size="small" sx={{ top: '9px!important', m: "0 8px 0 8px", minWidth: "0px!important" }} variant="contained"><Refresh sx={{ fontSize: "1rem" }}/></Button>
          </Tooltip>
        </Box>
    </Paper>
  );
};
