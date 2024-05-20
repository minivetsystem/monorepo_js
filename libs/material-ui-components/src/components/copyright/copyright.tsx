import React, { FC, ReactElement } from 'react';
import { ICopyrightProps } from './copyright.interface';
import { CopyrightText } from './copyright.style';

export const Copyright: FC<ICopyrightProps> = (props): ReactElement => {
  const { copyrightText } = props;
  return (
    <CopyrightText variant="subtitle2" color="background.paper">
      {copyrightText}
    </CopyrightText>
  );
};
