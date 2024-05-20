import React, { FC, ReactElement } from 'react';
import { CustomButton } from '../../../index';
import { FiltersContainer } from './buttonFilters.style';
import { IButtonFilters } from './buttonFilters.interface';

export const ButtonFilters: FC<IButtonFilters> = (props): ReactElement => {
  const { filterNames } = props;
  return (
    <FiltersContainer>
      {Array.isArray(filterNames) &&
        filterNames?.map((item, index) => (
          <CustomButton buttonText={item} key={index} />
        ))}
    </FiltersContainer>
  );
};
