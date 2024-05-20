import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

export const DataGridTable = styled(DataGrid)`
  .super-app-theme--LeadCapExhausted, .super-app-theme--Beyondacceptedschedule, .super-app-theme--ErrorsDetected, .super-app-theme--InternalNobuyerfound, .super-app-theme--Therewerenobuyersavailabletobidonthislead {
    background-color: #f8abab !important;
  }
  .super-app-theme--PingSuccessful, .super-app-theme--Accepted {
    background-color: #9ceb9c !important;
  }
  .super-app-theme--Duplicate {
    background-color: #fde1e1 !important;
  }
  .super-app-theme--PostSuccessful {
    background-color: #9ceb9c !important;
  }
  .super-app-theme--PostRejected, .super-app-theme--ClientValidationFailed {
    background-color: #f8abab !important;
  }
  .super-app-theme--PostYello{
    background-color: rgb(255, 255, 0)!important;
  }
  .super-app-theme--PostTotal .MuiDataGrid-cell .MuiDataGrid-cellContent {
    font-weight: 600!important;
  }
  border: none;
  .MuiDataGrid-cell {
    border: none;
  }
  .MuiDataGrid-columnHeaderTitle {
    font-size: 12px;
    font-weight: 600;
    text-overflow: initial;
    overflow: visible;
    white-space: normal;
    line-height: 20px;
    text-align: center;
  }
  .MuiDataGrid-cellContent {
    font-size: 12px;
    font-weight: 400;
  }
  .MuiDataGrid-columnSeparator {
    display: none;
  }
  .MuiTablePagination-selectLabel,
  .MuiTablePagination-displayedRows {
    font-weight: 400;
    font-size: 12px;
  }
  .MuiDataGrid-toolbarContainer {
    margin-left: auto;
    margin-bottom: 16px;
    button {
      color: #fff;
    }
  }
  .MuiDataGrid-row {
    max-height: 40px !important;
    min-height: 40px !important;
    height: 40px !important;
    border-top: 1px solid #000;
  }
  .MuiDataGrid-cell {
    max-height: 40px !important;
    min-height: 40px !important;
    height: 40px !important;
  }
  .MuiTypography-root {
    font-size: 12px;
  }
  .MuiDataGrid-row:hover {
    background-color: inherit;
  }
  .MuiDataGrid-virtualScrollerContent{
    height: 432px !important;
  }
  .super-app-theme--FooterHead .MuiDataGrid-cell .MuiDataGrid-cellContent{
    font-size: 12px;
    font-weight: 600;
    text-overflow: initial;
    overflow: visible;
    white-space: normal;
    line-height: 20px;
    text-align: center;
  }
  .MuiDataGrid-cell {
    white-space: unset!important;
    text-align: center;
  }
  .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar {
    min-height: 52px;
  }
  .css-vj1n65-MuiGrid-root {
    border-top: 1px solid #000;
  }
  .css-gbsurn-MuiTableCell-root {
    line-height: 25px;
  }
  .css-jbr0cj-MuiTablePagination-root{
    position: absolute;
    padding: 0px;
    left : 0
  }
`;
