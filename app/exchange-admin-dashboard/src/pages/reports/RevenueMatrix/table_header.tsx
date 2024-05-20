import { Tooltip, TableRow, TableCell } from '@mui/material';

export default function TableHeaderComponent(tableProps:any) {

  return <>
    <TableRow>
      <TableCell className='text-center text-weight-600 ptb16lr5' colSpan={8} component="th">
        <Tooltip title={tableProps?.tableProps?.tableTooltip || ""}><span>{tableProps?.tableProps?.tableTitle || ""}</span></Tooltip>
      </TableCell>
    </TableRow>

    <TableRow>
      <TableCell className='text-center text-weight-600 ptb16lr5' component="th">Row</TableCell>
      <TableCell className='text-center text-weight-600 ptb16lr5' component="th">Date</TableCell>
      <TableCell className='text-center text-weight-600 ptb16lr5' component="th">Gross <div>Revenue</div></TableCell>
      <TableCell className='text-center text-weight-600 ptb16lr5' component="th">Total Ret's <div>Rcvd</div>	</TableCell>
      <TableCell className='text-center text-weight-600 ptb16lr5' component="th">Net Rev <div>(after returns)</div></TableCell>
      <TableCell className='text-center text-weight-600 ptb16lr5' component="th">Total <div>Commission</div></TableCell>
      <TableCell className='text-center text-weight-600 ptb16lr5' component="th">Net <div>Profit</div></TableCell>
      <TableCell className='text-center text-weight-600 ptb16lr5' component="th">%</TableCell>
    </TableRow>
  </>;
}
