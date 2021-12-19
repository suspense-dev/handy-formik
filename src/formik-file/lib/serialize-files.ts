import { FormikFileCustomFile } from '../formik-file.types';

export const serializeFiles = (files: File[], asBase64?: boolean): FormikFileCustomFile[] => {
  const result: FormikFileCustomFile[] = [];
  files.forEach((file: File) => {
    if (asBase64) {
      const reader = new FileReader();
      reader.onload = (event) => {
        result.push({
          name: file.name,
          size: file.size,
          base64: (event.target?.result as string) || '',
          src: URL.createObjectURL(file),
          raw: file,
        });
      };
      reader.readAsDataURL(file);
    } else {
      result.push({
        name: file.name,
        size: file.size,
        src: URL.createObjectURL(file),
        raw: file,
      });
    }
  });
  return result;
};
