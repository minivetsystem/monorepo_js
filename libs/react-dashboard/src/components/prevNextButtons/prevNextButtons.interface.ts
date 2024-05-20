export interface IPrevNextButtons {
  onPrevClick: () => void;
  onNextClick: () => void;
  totalSteps: number;
  activeStep: number;
}
