import React, { FC, ReactElement } from 'react';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Typography,
  Switch as SwitchComp,
  SwitchProps,
  FormControlLabel,
} from '@mui/material';

interface IProps {
  label?: string;
  label2?: string;
}

const IOSSwitch = styled((props: SwitchProps) => (
  <SwitchComp
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  marginRight: '20px',
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {},
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor:
      theme.palette.mode === 'light' ? theme.palette.grey[100] : 'inherit',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export const Switch: FC<SwitchProps & IProps> = (props): ReactElement => {
  const { label, label2, sx, ...rest } = props;
  return (
    <Grid container>
      {label && (
        <Grid item xs={12} md={4.2}>
          <Typography variant="h5" fontWeight={600}>
            {label}
          </Typography>
        </Grid>
      )}
      <Grid item xs={12} md={6}>
        <FormControlLabel
          control={<IOSSwitch defaultChecked {...rest} />}
          label={<Typography variant="h5">{label2}</Typography>}
          sx={{ fontSize: 16 }}
        />
      </Grid>
    </Grid>
  );
};
