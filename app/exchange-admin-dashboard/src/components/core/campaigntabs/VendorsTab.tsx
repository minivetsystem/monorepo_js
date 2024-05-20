import React, { FC, ReactElement } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import { useLeadTypes } from '../../../hooks';
import { useQueryClient } from '@tanstack/react-query';
import {
  fetchVendorsForLeadType,
  useVendorsForLeadType,
} from '../../../hooks/users/useVendorsForLeadType';
import { filter } from 'lodash';

interface IProps {
  label?: string;
}

interface ILeadType {
  lead_type: string;
}

function not(a: readonly string[], b: readonly string[]) {
  return filter(a, (value) => {
    if (filter(b, { _id: value._id }).length === 0) {
      return value;
    }
  });
}

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const CampaignVendorsTab: FC<IProps> = ({
  right,
  setRight,
  left,
  setLeft,
  checked,
  setChecked,
  leftChecked,
  rightChecked,
}): ReactElement => {
  const [selectedLeadType, setSelectedLeadType] = React.useState('');
  const queryClient = useQueryClient();

  const { data: vendorsForLeadType } = useVendorsForLeadType(
    0,
    100,
    [{ field: 'username', sort: 'asc' }],
    [{ field: 'lead_type', value: selectedLeadType }],
  );

  const handleToggle = (value: any) => () => {
    const exists = filter(checked, { _id: value._id });
    let newChecked = [...checked];

    if (exists?.length === 0) {
      newChecked.push(value);
    } else {
      newChecked = filter(newChecked, (val) => {
        if (val._id !== value._id) {
          return val;
        }
      });
    }
    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const {
    handleSubmit: handleLeadTypeSubmit,
    control: leadTypeControl,
    formState: { errors: leadTypeErrors },
  } = useForm<ILeadType>();

  const onFetchVendorsForLeadType = (data) => {
    setSelectedLeadType(data.lead_type);
    if (
      !queryClient.getQueriesData([
        'vendors_for_lead_type',
        {
          page: 0,
          page_size: 100,
          sort: [{ field: 'username', sort: 'asc' }],
          filters: [{ field: 'lead_type', value: data.lead_type }],
        },
      ])
    ) {
      queryClient.prefetchQuery(
        [
          'vendors_for_lead_type',
          {
            page: 0,
            page_size: 100,
            sort: [{ field: 'username', sort: 'asc' }],
            filters: [{ field: 'lead_type', value: data.lead_type }],
          },
        ],
        fetchVendorsForLeadType,
        {
          staleTime: 1000 * 60,
        },
      );
    }
  };

  const { data: allLeadTypes } = useLeadTypes();

  React.useEffect(() => {
    if (vendorsForLeadType?.users?.length > 0) {
      const rightList = filter(vendorsForLeadType?.users, (vendor) => {
        if (filter(left, { _id: vendor._id }).length === 0) {
          return vendor;
        }
      });
      setRight(rightList);
    }
  }, [vendorsForLeadType?.users?.length]);

  const customList = (items: readonly number[]) => (
    <Paper sx={{ width: 500, height: 530, overflow: 'auto' }}>
      <List dense component="div" role="list">
        {items.map((vendor) => {
          const labelId = `transfer-list-item-${vendor._id}-label`;

          return (
            <ListItem
              key={vendor._id}
              role="listitem"
              button
              onClick={handleToggle(vendor)}
              sx={{
                border: '1px solid #BABABA',
              }}
            >
              <ListItemIcon>
                <Checkbox
                  checked={
                    filter(checked, { _id: vendor._id }).length > 0
                      ? true
                      : false
                  }
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primaryTypographyProps={{ fontSize: 13, margin: 0, padding: 0 }}
                primary={`${vendor.first_name} ${vendor.last_name}`}
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Stack spacing={2}>
      <Item sx={{ textAlign: 'left' }}>
        <Typography
          variant="subtitle1"
          sx={{ color: 'text.primary' }}
          display="inline"
        >
          Select Lead Type:
        </Typography>
        <Controller
          name="lead_type"
          control={leadTypeControl}
          rules={{ required: 'Please select lead type.' }}
          render={({ field: { onChange, value, ref } }) => (
            <TextField
              select
              sx={{ width: 200, mx: 2 }}
              size="small"
              inputRef={ref}
              value={value || ''}
              error={!!leadTypeErrors?.lead_type}
              helperText={leadTypeErrors?.lead_type?.message}
              onChange={(ev) => onChange(ev)}
            >
              {allLeadTypes?.map((option: any) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.lead_type}
                </MenuItem>
              )) || <div />}
            </TextField>
          )}
        />
        <Button
          sx={{ height: 35, width: 200 }}
          onClick={handleLeadTypeSubmit(onFetchVendorsForLeadType)}
          variant="outlined"
        >
          GET VENDORS
        </Button>
      </Item>
      <Item>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            <Typography variant="subtitle2" textAlign="left" fontWeight="bold">
              CURRENT TREE
            </Typography>
            {customList(left)}
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="move all right"
              >
                ≫
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="move all left"
              >
                ≪
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2" textAlign="left" fontWeight="bold">
              AVAILABLE MAPPING
            </Typography>
            {customList(right)}
          </Grid>
        </Grid>
      </Item>
    </Stack>
  );
};
