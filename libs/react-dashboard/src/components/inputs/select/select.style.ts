import { styled } from '@mui/material/styles';
import { OutlinedInput } from '@mui/material';

export const DropdownInput = styled(OutlinedInput)<{ value?: string }>`
  background: white;
  height: 40px;
  color: ${({ value }) => (value ? 'currentColor' : 'var(--gray4)')};
  fieldset {
    width: 100%;
    border: 1px solid;
    border-radius: 4px;
    box-shadow: none;
    border-color: var(--gray4);
  }
  .MuiSelect-select {
    padding: 0px 10px;
  }
`;
