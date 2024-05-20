import React from 'react';
import { TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Link } from '@mui/material';
import { MuiTable } from './index.style';

export default function TopTableComponent(tableProps:any) {
  const summaryData = tableProps.summaryData;
  return (
    <TableContainer sx={{ mt: 1 }} component={Paper}>
      <MuiTable sx={{ borderTop: "1px solid #ddd" }}>
        <TableHead className='bggray'>
          <TableRow className='text-center'>
            <TableCell component="th">Row #</TableCell>
            <TableCell component="th">Vendor Name</TableCell>
            <TableCell component="th">Auto Finance</TableCell>
            <TableCell component="th">Auto Insurance</TableCell>
            <TableCell component="th">Education</TableCell>
            <TableCell component="th">Health Insurance</TableCell>
            <TableCell component="th">Home Improvement</TableCell>
            <TableCell component="th">Home Insurance</TableCell>
            <TableCell component="th">Legal</TableCell>
            <TableCell component="th">Life Insurance</TableCell>
            <TableCell component="th">Mortgage</TableCell>
            <TableCell component="th">Real Estate Seller</TableCell>
            <TableCell component="th">Commission Total</TableCell>
            <TableCell component="th">Payment Method</TableCell>
            <TableCell component="th">Invoice Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        { summaryData.length > 0 ? summaryData.map((item, key) => {
          return (
              <TableRow key={key} className='text-center'>
                <TableCell>{item.row_no}</TableCell>
                <TableCell>AcquireCrowd_Vendor</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>$9,252.69</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>$1,167.00</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
                <TableCell className='cell-weight600'>$10,419.69</TableCell>
                <TableCell>ACH</TableCell>
                <TableCell>{item.last}</TableCell>
              </TableRow>
            )
          }) : <TableRow>
            <TableCell sx={{ lineHeight: "1rem", textAlign: "center" }} colSpan={15}>No rows</TableCell>
          </TableRow> }

          <TableRow className='text-center text-weight600'>
            <TableCell component="th">{(summaryData.length + 1)}</TableCell>
            <TableCell component="th">Totals:</TableCell>
            <TableCell component="th">$4,291.51</TableCell>
            <TableCell component="th">$7,365.56</TableCell>
            <TableCell component="th">$9,855.00</TableCell>
            <TableCell component="th">$9,252.69</TableCell>
            <TableCell component="th">$114,193.74</TableCell>
            <TableCell component="th">$24,705.16</TableCell>
            <TableCell component="th">$9,609.29</TableCell>
            <TableCell component="th">$9,332.65</TableCell>
            <TableCell component="th">$9,332.65</TableCell>
            <TableCell component="th">$9,332.65</TableCell>
            <TableCell component="th">$182,273.69</TableCell>
            <TableCell component="th" colSpan={2}></TableCell>
          </TableRow>
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
