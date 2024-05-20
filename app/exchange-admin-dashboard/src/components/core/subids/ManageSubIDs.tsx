import React, { FC, ReactElement } from 'react';
import { Grid } from '@mui/material';
import { Transferlist } from '../../common/transferlist';

export default function SelectAllTransferList(Props:any) {
  return (
    <Grid container spacing={2} sx={{ mt:2 }} justifyContent="center" alignItems="center">

      <Transferlist setValue={Props.setValue}/>

      <Grid item xs={3}></Grid>
      <Grid item xs={5}></Grid>
      <Grid item xs={7}></Grid>
    </Grid>
  );
}

export const ManageSubIDs: FC<IProps> = ({ setValue }): ReactElement => {
  return (
    <SelectAllTransferList setValue={setValue} />
  );
};
