import React, { FC, ReactElement } from 'react';
import {
  Paper,
  Box,
  TextField,
  MenuItem,
  Button
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import { ITable, IFilterPanel } from '../../../components/common/table/index.interface';

const FilterPanel: FC<IFilterPanel> = (props): ReactElement => {
  const {
    selectedFilter,
    resetProgress,
    onApplyFilters,
    onResetFilters,
    onFilterOptionChange,
    hideControls = false,
    isGoBtnClicked=false,
    selectedFilters
  } = props;

  const currentDate     = new Date();
  const endYear         = currentDate.getFullYear();
  const currentMonth    = currentDate.getMonth();
  const lastMonth       = currentMonth < 10 ? `0${currentMonth}` : currentMonth;

  return (
    <Box component="form" position="relative" display="inline-block" zIndex={1000} sx={{ '& .MuiTextField-root': { m: 1 } }}>
      {selectedFilter.field_type === 'multi-choice' && !hideControls && (
        <TextField
          id="outlined-select-options"
          select
          size="small"
          defaultValue=""
          label={selectedFilter.label}
          value={selectedFilter.value}
          onChange={(ev) => onFilterOptionChange(ev, selectedFilter.field)}
          sx={{ width: '8rem', marginRight: "0!important" }}
          className={selectedFilter.field}
        >
          {selectedFilter?.filter_options?.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}

      {selectedFilter.field_type === 'filter-start-end-date' && !hideControls && (
          <TextField
            disabled
            size="small"
            label={selectedFilter.label}
            value={selectedFilter.value}
            sx={{ width: '6.5rem', mx: 1, height: '35px', marginRight: "0!important" }}
          />
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

      {selectedFilter.field_type === 'returns-period' && !hideControls && (
        <span style={{ fontWeight: 600 }} className='last-updated'>Returns Period <br/> {selectedFilters?.[2]?.value || lastMonth}/{selectedFilters?.[3]?.value || endYear}</span>
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
