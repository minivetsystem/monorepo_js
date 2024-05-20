import { styled } from '@mui/material/styles';
import { Box, Modal } from '@mui/material';

export const ModalContentBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0px 4px 14px rgba(24, 44, 69, 0.05);
  border-radius: 8px;
  @media screen and (max-width: 576px) {
    width: 85%;
    margin: auto;
  }
  &:focus-visible {
    outline: none;
  }
`;

export const ModalContainer = styled(Modal)``;
