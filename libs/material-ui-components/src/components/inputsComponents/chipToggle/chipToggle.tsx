import React, { FC, ReactElement } from 'react';
import { Chip, Stack } from '@mui/material';
import { IChipToggle } from './chipToggle.interface';

export const ChipToggle: FC<IChipToggle> = (props): ReactElement => {
  const { toggleText1, toggleText2, isTrue, handleOnChange } = props;
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{
        border: '1px solid #CFDBDF',
        width: 'fit-content',
        borderRadius: '25px',
        padding: '0px 5px',
      }}
    >
      <Chip
        label={toggleText1}
        sx={{
          height: '34px',
          margin: '5px 0px',
          width: '94px',
          bgcolor: isTrue ? 'text.secondary' : 'transparent',
          color: isTrue ? 'white' : 'text.primary',
          fontWeight: 700,
          cursor: 'pointer',
          '&:hover': {
            bgcolor: isTrue ? 'text.secondary' : 'transparent',
            color: isTrue ? 'white' : 'text.primary',
          },
        }}
        onClick={() => handleOnChange(true)}
      />
      <Chip
        label={toggleText2}
        sx={{
          height: '34px',
          margin: '5px 0px',
          width: '94px',
          fontWeight: 700,
          bgcolor: isTrue ? 'transparent' : 'red',
          color: isTrue ? 'text.primary' : 'white',
          '&:hover': {
            bgcolor: isTrue ? 'transparent' : 'red',
            color: isTrue ? 'text.primary' : 'white',
          },
        }}
        onClick={() => handleOnChange(false)}
      />
    </Stack>
  );
};
