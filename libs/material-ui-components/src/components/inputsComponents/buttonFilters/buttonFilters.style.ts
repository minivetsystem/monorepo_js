import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const FiltersContainer = styled(Box)`
  gap: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  @media screen and (max-width: 800px) {
    margin: 0px 10px;
    justify-content: center;
  }
  button {
    border-radius: 4px;
    height: 40px;
    font-size: 14px;
    line-height: 26px;
    font-weight: 400;
    border: 1px solid var(--gray5);
    box-shadow: none;
    padding-left: 25px;
    padding-right: 25px;
    color: var(--black1);
  }
`;
