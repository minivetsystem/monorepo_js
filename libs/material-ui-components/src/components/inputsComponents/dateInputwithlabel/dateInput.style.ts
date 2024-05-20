import { styled } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const DatePickerWrapper = styled(DatePicker)`
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
`;
