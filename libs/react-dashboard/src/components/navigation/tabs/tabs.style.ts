import { styled } from '@mui/material/styles';
import { Tabs, Tab } from '@mui/material';

export const TabsWrapper = styled(Tabs)`
  width: fit-content;
  .MuiTabs-flexContainer {
    justify-content: center;
    gap: 10px;
    @media screen and (max-width: 992px) {
      justify-content: start;
    }
  }
  @media screen and (max-width: 992px) {
    width: 100%;
  }
`;

export const TabWrapper = styled(Tab)`
  font-size: 16px;
  font-weight: 700;
  color: var(--black1);
  line-height: 18px;
  letter-spacing: 0.02em;
  &.Mui-selected {
    border-bottom: 4px solid #4f51fd;
    color: var(--purple1);
  }
`;
