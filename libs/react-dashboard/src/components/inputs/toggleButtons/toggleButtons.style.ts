import { styled } from '@mui/material/styles';
import { ToggleButtonGroup } from '@mui/material';

export const ToggleButtonGroupList = styled(ToggleButtonGroup)`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
  .MuiToggleButtonGroup-grouped:not(:last-of-type) {
    border: 1px solid var(--gray4);
    border-radius: 6px;
  }
  .MuiToggleButtonGroup-grouped:not(:first-of-type) {
    border: 1px solid var(--gray4);
    border-radius: 6px;
  }
  .MuiButtonBase-root {
    background: white;
    height: 44px;
    border: 1px solid var(--gray4);
    max-width: 150px;
    margin-left: 0px;
    border-radius: 6px;
    text-transform: capitalize;
    &.Mui-selected {
      background-color: var(--main);
      color: white;
    }
    &:hover,
    &:focus {
      background-color: var(--main) !important;
      color: white;
    }
  }
`;
