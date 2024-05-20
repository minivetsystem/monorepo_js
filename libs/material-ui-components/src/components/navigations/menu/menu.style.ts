import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const MenuBar = styled(Box)`
  a {
    margin-right: 36px;
    text-decoration: none;
    line-height: 18px;
    text-align: right;
    :hover {
      h6 {
        color: var(--purple1);
      }
    }
    @media screen and (max-width: 1250px) {
      margin-right: 17px;
      h5 {
        font-size: 14px;
      }
    }
  }
`;
