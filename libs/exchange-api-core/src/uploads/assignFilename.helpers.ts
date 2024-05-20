import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { FileUploadDto } from './dto/fileUpload.dto';

const safelyExtractFileName = (file: FileUploadDto) => {
  const name = file.originalname.split('.')[0];
  return name.replace(/\s/g, '').trim();
};

const getFileExtension = (file: FileUploadDto) => {
  return path.extname(file.originalname);
};

const generateDateString = () => {
  return new Date().getTime().toString().trim();
};

export const generateFileName = (file: FileUploadDto) => {
  return `${safelyExtractFileName(
    file,
  )}-${generateDateString()}-${uuidv4()}${getFileExtension(file)}`;
};

export const assignFilename = (req, file, callback) => {
  callback(null, generateFileName(file));
};
