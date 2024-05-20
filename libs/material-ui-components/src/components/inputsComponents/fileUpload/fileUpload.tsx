import React, { FC, ReactElement, useCallback } from 'react';
import { Typography } from '@mui/material';
import { CustomButton } from '../../../index';
import { useDropzone } from 'react-dropzone';
import { FileUploadBox } from './fileUpload.style';
import { IFileUpload } from './fileUpload.interface';

export const FileUpload: FC<IFileUpload> = (props): ReactElement => {
  const { setFiles, isMultiple } = props;

  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': [],
      'text/csv': [],
    },
    multiple: isMultiple || true,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isMultiple !== false && (
        <FileUploadBox>
          <img
            src="/images/plus.png"
            alt=""
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </FileUploadBox>
      )}
      <Typography variant="subtitle1" align="center" fontWeight={700} mt={3}>
        Select files to upload{' '}
      </Typography>
      <Typography
        variant="body2"
        align="center"
        color="text.disabled"
        pb={1}
        pt={1.3}
      >
        or drag anf drop, copy and paste files
      </Typography>
      <Typography
        variant="body2"
        align="center"
        color="text.disabled"
        pb={3.2}
        pt={1}
      >
        File should have image with extensions (.jpg,.jpeg,.png)
      </Typography>
      <CustomButton
        buttonText="browse"
        variant="contained"
        style={{ margin: 'auto', display: 'flex' }}
      />
    </div>
  );
};
