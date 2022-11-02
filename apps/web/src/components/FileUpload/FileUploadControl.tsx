import { useField } from "formik";
import { FunctionComponent } from "react";
import { FileUpload } from "./FileUpload";

interface FileUploadControlProps {
  name: string;
  label: string;
  acceptedFileTypes: string;
}

export const FileUploadControl: FunctionComponent<FileUploadControlProps> = ({
  name,
  ...props
}) => {
  const [field] = useField(name);

  return <FileUpload {...field} {...props} />;
};
