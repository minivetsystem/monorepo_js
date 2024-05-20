import React, { FC, ReactElement } from 'react';
import { CustomButton } from '../../index';
import { CreateButtonsWrap } from './createButtons.style';
import { ICreateButtons } from './createButtons.interface';

export const CreateButtons: FC<ICreateButtons> = (props): ReactElement => {
  const { selectedButton, setSelectedButton } = props;

  const buttonStyle = {
    mr: '15px',
    '@media screen and (max-width: 576px)': {
      margin: '10px',
    },
  };

  const onClickButton = (value: string) => {
    setSelectedButton(value);
  };

  return (
    <CreateButtonsWrap flexWrap="wrap" display="flex">
      {/* <CustomButton
        buttonText="new item"
        variant="outlined"
        style={buttonStyle}
        startIcon={<img src="/images/plus.png" alt="" />}
        onClick={() => onClickButton('newItem')}
        isActive={selectedButton === 'newItem'}
      /> */}
      <CustomButton
        buttonText="Theme Selection "
        variant="outlined"
        style={buttonStyle}
        startIcon={<img src="/images/quick.png" alt="" />}
        onClick={() => onClickButton('instant')}
        isActive={selectedButton === 'instant'}
      />
      <CustomButton
        buttonText="product selection"
        variant="outlined"
        startIcon={<img src="/images/create.png" alt="" />}
        style={buttonStyle}
        onClick={() => onClickButton('product')}
        isActive={selectedButton === 'product'}
      />
    </CreateButtonsWrap>
  );
};
