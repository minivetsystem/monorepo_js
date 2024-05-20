import React, { FC, ReactElement } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionSummary, AccordionDetails } from '@mui/material';
import { IAccordionProps } from './accordion.interface';
import { Collapse } from './accordion.style';

export const Accordion: FC<IAccordionProps> = (props): ReactElement => {
  const { style, summary, details, expandIcon } = props;
  return (
    <Collapse sx={style}>
      <AccordionSummary
        expandIcon={
          expandIcon ? <img src={expandIcon} alt="" /> : <ExpandMoreIcon />
        }
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        {summary}
      </AccordionSummary>
      <AccordionDetails>{details}</AccordionDetails>
    </Collapse>
  );
};
