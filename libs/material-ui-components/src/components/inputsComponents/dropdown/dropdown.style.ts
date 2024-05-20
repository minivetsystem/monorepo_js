import { styled } from '@mui/material/styles';
import { OutlinedInput } from '@mui/material';

export const DropdownInput = styled(OutlinedInput)`
  margin-top: 0px;
  fieldset {
    border: 2px solid;
    border-radius: 4px;
    box-shadow: none;
    border-color: var(--gray2);
    &:focus-visible,
    &:hover,
    &:focus {
      outline: none;
      border-color: var(--gray2) !important;
    }
  }
  &.Mui-focused {
    fieldset {
      outline: none;
      border-color: black !important;
    }
  }
`;
