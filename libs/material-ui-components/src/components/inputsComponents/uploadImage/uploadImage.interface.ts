export interface IFileUpload {
  setFile: (value: File) => void;
  file: File | undefined;
}
