import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';

export const CustomSwitch = styled(Switch)`
  padding: 8px;
  width: 100px;
  height: 50px;
  & .MuiSwitch-track {
    border-radius: 20px;
  }
  & .MuiSwitch-thumb {
    width: 21px;
    height: 21px;
    margin: 5px 8px;
  }
  & .MuiSwitch-switchBase.Mui-checked {
    transform: translateX(46px);
  }
`;
