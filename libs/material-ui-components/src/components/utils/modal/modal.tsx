import React, { FC, ReactElement, PropsWithChildren } from 'react';
import { ModalContainer, ModalContentBox } from './modal.style';
import { IModalProps } from './modal.interface';

export const Modal: FC<IModalProps & PropsWithChildren> = (
  props,
): ReactElement => {
  const { open, handleClose, width, children } = props;

  return (
    <ModalContainer open={open} onClose={handleClose}>
      <ModalContentBox width={width ?? '442px'}>{children}</ModalContentBox>
    </ModalContainer>
  );
};
