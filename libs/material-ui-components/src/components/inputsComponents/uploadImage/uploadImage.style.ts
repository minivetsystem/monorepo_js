import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const FileUploadBox = styled(Box)<{ image?: string }>`
  position: relative;
  margin: 0 auto;
  max-width: 265px;
  height: 255px;
  background-size: cover !important;
  background: ${({ image }) => `url(${image}) no-repeat center center;`};
  border: 1px solid ${({ image }) => (image ? 'transparent' : 'var(--gray1)')};
`;

export const EditBox = styled(Box)<{ image?: string }>`
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 47.17px;
  background: rgba(233, 233, 234, 0.5);
  img {
    float: right;
    padding: 15px;
  }
`;
