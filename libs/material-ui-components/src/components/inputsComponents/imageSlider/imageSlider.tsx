import React, { FC, ReactElement, PropsWithChildren, useRef } from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import classes from 'classnames';
import { IImageSlider } from './imageSlider.interface';

export const ImageSlider: FC<IImageSlider & PropsWithChildren> = (
  props,
): ReactElement => {
  const { settings, children, className, prevButtonClass, nextButtonClass } =
    props;
  const slider = useRef(null);

  function SampleNextArrow(props: any) {
    const { className, onClick } = props;
    return (
      <div className={classes(className, nextButtonClass)} onClick={onClick} />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, onClick } = props;
    return (
      <div className={classes(className, prevButtonClass)} onClick={onClick} />
    );
  }

  const allSettings = {
    ...settings,
    infinite: true,
    className: className,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Box position="relative">
      <Slider ref={slider} {...allSettings}>
        {children}
      </Slider>
    </Box>
  );
};
