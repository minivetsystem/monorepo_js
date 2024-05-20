import { styled } from '@mui/material/styles';
import { OutlinedInput } from '@mui/material';

export const OutlinedInputWrapper = styled(OutlinedInput)`
  width: 100%;
  height: 44px;
  background: white;
  img {
    margin-top: 5px;
    margin-right: 8px;
  }
  input {
    font-size: 14px;
    padding: 10px 12px;
  }
  fieldset {
    border: 1px solid var(--gray4);
    border-radius: 4px;
    box-shadow: none;
  }
  .MuiFormControl-root {
    width: 100%;
  }
`;
