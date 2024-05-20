import { styled } from '@mui/material/styles';
import { Table } from '@mui/material';

export const MuiTable = styled(Table)`
.text-center {
  text-align: center;
  padding: 3px 5px!important;
}
.text-center td{
  text-align: center;
  padding: 6px 8px!important;
  font-size: 12px;
  border: 1px solid #616161;
}
.text-center th{
  font-weight: 600;
  text-align: center;
  padding: 12px 8px!important;
  font-size: 12px;
  border: 1px solid #616161;
}
.row-head {
  font-weight: 600;
}
.bggray {
  background-color: #eceff1;
}
.send-to-col {
  max-width: 250px;
  word-wrap: break-word;
}
`;
