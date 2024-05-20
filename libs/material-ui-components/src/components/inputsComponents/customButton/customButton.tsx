import React, { FC, ReactElement } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { ICustomButtonProps, IVariantEnum } from './customButton.interface';

export const CustomButton: FC<ICustomButtonProps & ButtonProps> = (
  props,
): ReactElement => {
  const { buttonText, variant, style, hrefUrl, isDisabled, isActive, ...rest } =
    props;

  const stylesContained = {
    color: 'background.paper',
    backgroundColor: 'text.secondary',
    height: '45px',
    fontSize: '14px',
    borderRadius: '30px',
    paddingRight: '35px',
    paddingLeft: '35px',
    fontWeight: 700,
    letterSpacing: '0.02em',
    '@media screen and (max-width: 992px)': {
      paddingRight: '24px',
      paddingLeft: '24px',
    },
    '&:hover': {
      backgroundColor: 'text.secondary',
    },
  };

  const stylesOutlined = {
    ...stylesContained,
    backgroundColor: isActive ? 'text.secondary' : 'transparent',
    color: isActive ? 'background.paper' : 'text.secondary',
    border: '1px solid rgba(79, 81, 253, 0.2)',
    img: {
      filter: isActive ? 'brightness(0) invert(1)' : '',
    },
    '&:hover': {
      color: 'background.paper',
      backgroundColor: 'text.secondary',
      img: {
        filter: 'brightness(0) invert(1)',
      },
    },
  };

  const stylesLink = {
    fontSize: '16px',
    fontWeight: 700,
    letterSpacing: '0.02em',
    backgroundColor: 'transparent',
    color: 'text.secondary',
    padding: '0px',
    boxShadow: 'none',
    border: 'none',
    '&:hover, &:active, &:focus-visible': {
      color: 'text.secondary',
      backgroundColor: 'transparent',
      span: {
        outline: 'none',
        backgroundColor: 'transparent',
      },
    },
  };

  const styles =
    variant === 'contained'
      ? { ...stylesContained, ...style }
      : { ...stylesOutlined, ...style };

  const renderButton = () => {
    if (hrefUrl) {
      return (
        <Button href={hrefUrl} sx={{ ...stylesLink, ...style }} {...rest}>
          {buttonText}
        </Button>
      );
    }
    return (
      <Button
        variant={(variant ? variant : 'contained') as IVariantEnum}
        sx={styles}
        disabled={isDisabled || false}
        {...rest}
      >
        {buttonText}
      </Button>
    );
  };

  return renderButton();
};
