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
}
.text-center th{
  text-align: center;
  font-weight: 600;
  padding: 12px 8px!important;
  font-size: 12px;
}
.row-head {
  font-weight: 600;
}
.bggray {
  background-color: #eceff1;
}
`;


