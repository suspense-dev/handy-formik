import { FormikFileCustomFile, FormikFileFormat } from '../FormikFile.types';

export const serializeFiles = (files: File[], targetFormat?: FormikFileFormat): FormikFileCustomFile[] => {
  const result: FormikFileCustomFile[] = [];
  files.forEach((file: File) => {
    const reader: any = new FileReader();
    reader.onload = (e: { target: { result: string } }) => {
      const src = (() => {
        if (targetFormat === 'base64')
          return e.target.result;
        else
          return file;
      })();

      result.push({
        name: file.name,
        size: file.size,
        preview: e.target.result,
        src
      })
    };
    reader.readAsDataURL(file);
  })
  return result;
}
