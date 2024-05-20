import React, { FC } from 'react';
import { Box, Typography, StepLabel } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Steps, Label, StepBox } from './stepper.style';
import { IStepper } from './stepper.interface';

export const FormStepper: FC<IStepper> = (props) => {
  const { stepsList, activeStep } = props;

  return (
    <Box sx={{ width: '100%' }}>
      <Steps activeStep={activeStep}>
        {Array.isArray(stepsList) &&
          stepsList?.map((item, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <StepBox
                key={index}
                isactive={activeStep === index ? 'true' : 'false'}
                {...stepProps}
              >
                <StepLabel {...labelProps}>
                  <Label>
                    <Box>
                      <Typography variant="subtitle2">{item.label}</Typography>
                      <Typography variant="body1" color="var(--gray2)">
                        {item.subLabel}
                      </Typography>
                    </Box>
                    <ArrowForwardIosIcon />
                  </Label>
                </StepLabel>
              </StepBox>
            );
          })}
      </Steps>
      <Box
        justifyContent="center"
        alignItems="center"
        sx={{
          background: 'white',
          height: '50px',
          display: { xs: 'center', sm: 'none' },
        }}
        mt={2}
      >
        <Typography variant="h5" align="center">{`${activeStep + 1} / ${
          stepsList.length
        }`}</Typography>
      </Box>
    </Box>
  );
};
