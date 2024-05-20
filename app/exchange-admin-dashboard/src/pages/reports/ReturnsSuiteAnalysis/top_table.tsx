import React, { useEffect } from 'react';
import { TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Link } from '@mui/material';
import { useSendReturnsEmail } from '../../../hooks';
import { MuiTable } from './index.style';
import { useSelector } from 'react-redux';

export default function TopTableComponent(tableProps:any) {
  const { mutate: sendReturnsEmail, isSuccess: isSuccessSendReturnEmail } = useSendReturnsEmail();
  const userState = useSelector((state: any) => state.user);

  const onGenerateApply = (props:any) => {
    props.return_month = tableProps?.newFilterModel?.[2]?.value;
    props.return_year  = tableProps?.newFilterModel?.[3]?.value;
    props.added_by = userState?.user?._id;
    sendReturnsEmail(props);
  }

  useEffect(()=>{
    if (isSuccessSendReturnEmail) {
      tableProps.onSuccess(isSuccessSendReturnEmail);
    }
  }, [isSuccessSendReturnEmail])

  const summaryData = tableProps.summaryData;
  return (
    <TableContainer sx={{ mt: 1 }} component={Paper}>
      <MuiTable sx={{ mb: 3, borderTop: "1px solid #ddd" }}>
        <TableHead className='bggray'>
          <TableRow className='text-center'>
            <TableCell colSpan={12} align='center' component="th">Returns Period Summary</TableCell>
          </TableRow>
          <TableRow className='text-center'>
            <TableCell component="th">Row #</TableCell>
            <TableCell component="th">Lead Type</TableCell>
            <TableCell component="th">Vendor</TableCell>
            <TableCell component="th">Vendor Returns Email</TableCell>
            <TableCell component="th"># Leads</TableCell>
            <TableCell component="th"># Returns</TableCell>
            <TableCell component="th">Return Rate</TableCell>
            <TableCell component="th">Returned Costs (Vendor $)</TableCell>
            <TableCell component="th">Returned Revenue (Client $)</TableCell>
            <TableCell component="th"># Returns Sent</TableCell>
            <TableCell component="th"># Returns NOT Sent</TableCell>
            <TableCell component="th">Generate and Send Returns File</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        { summaryData.length > 0 ? summaryData.map((item, key) => {
          return (
              <TableRow key={key} className='text-center'>
                <TableCell>{item.row_no}</TableCell>
                <TableCell>{item.lead_type}</TableCell>
                <TableCell>{item.vendor_name}</TableCell>
                <TableCell>{item.vendor_returns_emails}</TableCell>
                <TableCell>{item.total_leads}</TableCell>
                <TableCell>{item.total_return_leads}</TableCell>
                <TableCell>{item.return_rate}</TableCell>
                <TableCell>{item.total_return_vendor_price}</TableCell>
                <TableCell>{item.total_return_client_price}</TableCell>
                <TableCell>{item.total_return_leads_sent}</TableCell>
                <TableCell>{item.total_return_leads_not_sent}</TableCell>
                <TableCell>{item.show_generate_link ? <Link onClick={()=>onGenerateApply({ lead_type_id: item.lead_type_id, vendor_id: item.vendor_id })} sx={{ cursor: "pointer" }}>Generate and Send Returns File</Link> : "No new returns to send" }</TableCell>
              </TableRow>
            )
          }) : <TableRow>
            <TableCell sx={{ lineHeight: "1rem", textAlign: "center" }} colSpan={12}>No rows</TableCell>
          </TableRow> }
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
