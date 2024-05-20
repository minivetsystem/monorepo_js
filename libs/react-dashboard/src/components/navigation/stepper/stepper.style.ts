import { styled } from '@mui/material/styles';
import { Stepper, Box, Step } from '@mui/material';

export const Steps = styled(Stepper)`
  justify-content: center;
  .MuiStepConnector-root {
    display: none;
  }
  @media screen and (max-width: 1099px) {
    .MuiStepLabel-root {
      flex-direction: column;
    }
    .MuiTypography-root {
      text-align: center;
    }
    .MuiStepLabel-iconContainer {
      padding-right: 35px;
    }
  }
  @media screen and (max-width: 700px) {
    .MuiStepLabel-iconContainer {
      padding-right: 10px;
    }
  }
`;

export const Label = styled(Box)`
  display: flex;
  align-items: center;
  svg {
    fill: var(--gray4);
    margin-left: 30px;
    @media screen and (max-width: 1099px) {
      margin-left: 15px;
    }
    @media screen and (max-width: 700px) {
      margin-left: 0px;
      display: none;
    }
  }
`;

export const StepBox = styled(Step)<{ isactive: string }>`
  padding-bottom: 16px;
  border-bottom: 1px solid var(--gray4);
  .MuiStepLabel-iconContainer {
    .MuiSvgIcon-root {
      font-size: 28px;
      fill: var(--gray3);
    }
  }
  :has(.Mui-active) {
    border-bottom: 4px solid var(--main);
  }
  .Mui-active,
  .Mui-completed {
    .MuiSvgIcon-root {
      :first-of-type {
        fill: var(--main);
      }
    }
    .MuiTypography-root {
      color: var(--main);
    }
  }
  @media screen and (max-width: 700px) {
    display: ${({ isactive }) => (isactive === 'true' ? 'block' : 'none')};
  }
`;
