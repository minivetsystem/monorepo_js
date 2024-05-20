import React, { FC, ReactElement, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUploadBox, EditBox } from './uploadImage.style';
import { IFileUpload } from './uploadImage.interface';

export const UploadImage: FC<IFileUpload> = (props): ReactElement => {
  const { setFile } = props;
  const [filePreview, setPreview] = useState({ preview: '' });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    setPreview(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]) || '',
      }),
    );
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <FileUploadBox image={filePreview.preview}>
        <EditBox>
          <img src="/images/icon-edit.png" alt="" />
        </EditBox>
      </FileUploadBox>
    </div>
  );
};
