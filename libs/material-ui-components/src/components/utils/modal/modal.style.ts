import { styled } from '@mui/material/styles';
import { Box, Modal } from '@mui/material';

export const ModalContentBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  max-height: 85vh;
  transform: translate(-50%, -50%);
  background-color: var(--white1);
  box-shadow: 0px 4px 14px rgba(24, 44, 69, 0.05);
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
  @media screen and (max-width: 576px) {
    width: 85%;
    margin: auto;
  }
`;

export const ModalContainer = styled(Modal)``;
