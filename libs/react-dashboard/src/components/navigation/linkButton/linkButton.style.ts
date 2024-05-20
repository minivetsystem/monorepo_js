import { styled } from '@mui/material/styles';
import {
  Box,
  Accordion,
  AccordionSummary,
  Button,
  AccordionDetails,
} from '@mui/material';

export const AccordionItem = styled(Accordion)`
  box-shadow: none;
  width: 260px;
  margin-bottom: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  &.Mui-expanded:last-of-type {
    margin-bottom: 10px;
  }
  .MuiButton-startIcon{
    margin-right: 0px;
  }
`;

export const AccordionSummaryBox = styled(AccordionSummary)`
  padding: 8px 16px;
  &.Mui-expanded {
    max-height: 38px;
    min-height: unset;
  }
  .MuiAccordionSummary-content {
    margin: 0px;
    &.Mui-expanded {
      margin: 0px;
    }
  }
`;

export const NavLink = styled(Button)`
  justify-content: start;
  padding: 0px;
  font-size: 14px;
  text-transform: capitalize;
  svg {
    margin-left: 10px;
    margin-right: 10px;
  }
`;

export const ChildMenu = styled(Box)`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 8px;
`;

export const AccordionDetailsBox = styled(AccordionDetails)``;
