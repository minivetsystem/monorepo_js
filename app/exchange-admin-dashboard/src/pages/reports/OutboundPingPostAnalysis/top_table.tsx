import { TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import { MuiTable } from './index.style';
export default function TopTableComponent(tableProps:any) {
  return (
    <>
      <TableContainer sx={{ mt: 1 }} component={Paper}>
        <MuiTable sx={{ mb: 3, borderTop: "1px solid #ddd" }}>
          <TableHead className='bggray'>
            <TableRow className='text-center'>
              <TableCell component="th"></TableCell>
              <TableCell component="th">Total Pings</TableCell>
              <TableCell component="th">Accepted Pings</TableCell>
              <TableCell component="th">Rejected Pings</TableCell>
              <TableCell component="th">Total Posts</TableCell>
              <TableCell component="th">Accepted Posts</TableCell>
              <TableCell component="th">Rejected Posts</TableCell>
              <TableCell component="th">Returned Posts	</TableCell>
              <TableCell component="th">Total Direct Posts	</TableCell>
              <TableCell component="th">Accepted Direct Posts</TableCell>
              <TableCell component="th">Rejected Direct Posts</TableCell>
              <TableCell component="th">Returned Direct Posts</TableCell>
              <TableCell component="th">Net Leads Delivered</TableCell>
              <TableCell component="th">Placement %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow className='text-center'>
                <TableCell className='row-head'>INBOUND:</TableCell>
                <TableCell>31,415,442</TableCell>
                <TableCell>392775</TableCell>
                <TableCell>31,022,667</TableCell>
                <TableCell>83,582</TableCell>
                <TableCell>83,582</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>8,519</TableCell>
                <TableCell>0.00%</TableCell>
                <TableCell>0.00%</TableCell>
              </TableRow>
              <TableRow className='text-center'>
                <TableCell className='row-head'>OUTBOUND:</TableCell>
                <TableCell>31,415,442</TableCell>
                <TableCell>392775</TableCell>
                <TableCell>31,022,667</TableCell>
                <TableCell>83,582</TableCell>
                <TableCell>83,582</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>8,519</TableCell>
                <TableCell>0.00%</TableCell>
                <TableCell>0.00%</TableCell>
              </TableRow>
          </TableBody>
        </MuiTable>
      </TableContainer>
      <TableContainer component={Paper}>
        <MuiTable sx={{ mb: 3 }}>
          <TableHead className='bggray'>
            <TableRow className='text-center'>
              <TableCell component="th"></TableCell>
              <TableCell component="th">Gross Revenue</TableCell>
              <TableCell component="th">Returned Revenue</TableCell>
              <TableCell component="th">Net Revenue</TableCell>
              <TableCell component="th">Total Cost</TableCell>
              <TableCell component="th">Returned Cost</TableCell>
              <TableCell component="th">Net Cost</TableCell>
              <TableCell component="th">Net Profit</TableCell>
              <TableCell component="th">Avg Revenue Per Lead</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow className='text-center'>
                <TableCell className='row-head'>REVENUE:</TableCell>
                <TableCell>31,415,442</TableCell>
                <TableCell>392775</TableCell>
                <TableCell>31,022,667</TableCell>
                <TableCell>83,582</TableCell>
                <TableCell>83,582</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
                <TableCell>0</TableCell>
              </TableRow>
          </TableBody>
        </MuiTable>
      </TableContainer>
    </>
  );
}
