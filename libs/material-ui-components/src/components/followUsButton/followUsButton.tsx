import React, { FC, ReactElement } from 'react';
import { CustomButton } from '../../index';
import { IFollowUsButtonProps } from './followUsButton.interface';

export const FollowUsButton: FC<IFollowUsButtonProps> = (
  props,
): ReactElement => {
  const { image, buttonText } = props;
  return (
    <CustomButton
      variant="contained"
      startIcon={<img src={image} alt="" />}
      buttonText={buttonText}
      style={{
        width: 'fit-content',
        '@media screen and (max-width: 576px)': {
          width: '270px',
        },
      }}
    />
  );
};
