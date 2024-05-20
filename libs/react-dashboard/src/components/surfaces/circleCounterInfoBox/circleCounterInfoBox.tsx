import React, { FC, ReactElement } from 'react';
import Circle from 'react-circle';
import { Paper, Typography } from '@mui/material';
import { ICircleCounterInfoBox } from './circleCounterInfoBox.interface';
import { ContainerBox, InfoBox, CircleBox } from './circleCounterInfoBox.style';

export const CircleCounterInfoBox: FC<ICircleCounterInfoBox> = (
  props,
): ReactElement => {
  // Destructure props
  const {
    color = '#38BDF8',
    percentage = 75,
    value = 'Value',
    subHeading = 'Sub Heading',
    heading = 'Heading',
  } = props;

  return (
    <Paper sx={{ display: 'flex', width: '100%' }} elevation={0}>
      <ContainerBox>
        <InfoBox direction="column" spacing={1}>
          <Typography variant="h5">{heading}</Typography>
          <Typography variant="body2">{subHeading}</Typography>
          <Typography variant="h3" sx={{ color: `${color}` }}>
            {value}
          </Typography>
        </InfoBox>
        <CircleBox ml={2} display="flex" alignItems="center">
          <Circle
            progress={percentage}
            progressColor={color}
            animate={true}
            textColor={color}
            textStyle={{
              font: 'bold 6rem Helvetica, Arial, sans-serif', // CSSProperties: Custom styling for percentage.
            }}
            animationDuration="1s"
            showPercentageSymbol={true}
            size="96"
          />
        </CircleBox>
      </ContainerBox>
    </Paper>
  );
};
