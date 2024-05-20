import { styled } from '@mui/material/styles';
import { OutlinedInput, Select } from '@mui/material';

export const OutlinedInputWrapper = styled(OutlinedInput)`
  fieldset {
    border: 2px solid;
    border-radius: 4px;
    box-shadow: none;
    border-color: #e1f3f4 !important;
  }
`;

export const SelectWrapper = styled(Select)`
  margin-top: 6px;
  font-size: 16px;
  width: 103px;
  @media screen and (max-width: 500px) {
    width: 90px;
    svg {
      right: 10px;
    }
  }
`;
