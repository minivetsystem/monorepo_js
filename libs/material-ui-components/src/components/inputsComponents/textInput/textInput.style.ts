import { styled } from '@mui/material/styles';
import { OutlinedInput } from '@mui/material';

export const OutlinedInputWrapper = styled(OutlinedInput)`
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
    &:focus-visible,
    &:hover {
      outline: none;
      border-color: var(--gray2) !important;
    }
  }
  .MuiFormControl-root {
    width: 100%;
  }
  &.Mui-focused:not(&.Mui-error) {
    fieldset {
      outline: none;
      border-color: black !important;
    }
  }
`;
