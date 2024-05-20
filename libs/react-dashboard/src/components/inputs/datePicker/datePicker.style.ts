import { styled } from '@mui/material/styles';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export const DatePickerWrapper = styled(DateTimePicker)`
  width: 100%;
  background: white;
  .MuiInputBase-input{
    padding: 10px;

  }
  img {
    margin-top: 5px;
    margin-right: 8px;
  }
  input {
    font-size: 16px;
  }
  fieldset {
    border: 2px solid;
    border-radius: 4px;
    box-shadow: none;
  }
`;
