import  React, { FC, ReactElement } from 'react';
import { Button } from '@monorepo/react-dashboard';
import { IPrevNextButtons } from './prevNextButtons.interface';
import { PrevNextBox } from './prevNextButtons.style';

export const PrevNextButtons: FC<IPrevNextButtons> = (props): ReactElement => {
  const { onPrevClick, onNextClick, totalSteps, activeStep } = props;
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === totalSteps - 1;

  return (
    <PrevNextBox
      display="flex"
      alignContent="center"
      flexDirection="row"
      justifyContent="center"
      margin="auto"
    >
      <Button
        buttonText="Prev"
        variant="contained"
        onClick={onPrevClick}
        disabled={isFirstStep}
      />

      <Button
        buttonText={isLastStep ? 'Submit' : 'Next'}
        variant="contained"
        onClick={onNextClick}
      />
    </PrevNextBox>
  );
};
