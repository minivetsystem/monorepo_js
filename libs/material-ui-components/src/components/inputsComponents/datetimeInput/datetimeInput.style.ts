import { styled } from '@mui/material/styles';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export const DateTimePickerWrapper = styled(DateTimePicker)`
  width: 100%;
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
    border-color: var(--gray2);
  }
  .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input {
    padding: 10px 14px;
  }
  
`;
