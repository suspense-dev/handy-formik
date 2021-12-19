import { useFormikContext } from 'formik';
import React, { ChangeEvent } from 'react';

import { serializeFiles } from './lib';
import { FormikFileProps } from './formik-file.types';

export const FormikFile = ({
  render,
  name,
  maxFiles,
  multiple,
  maxSize,
  accept,
  asBase64,
  onExceedMaxFiles,
}: FormikFileProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setUploading]: any = React.useState(false);
  const { errors, touched, setFieldValue, getFieldProps }: any = useFormikContext();
  const { onBlur, value } = getFieldProps(name);

  const handleChange = React.useCallback(
    (payload: ChangeEvent<HTMLInputElement> | FileList) => {
      const dropped = payload instanceof FileList ? payload : payload.target.files;

      if (!dropped || !dropped.length) return;

      setUploading(true);
      const droppedFilesAmount = dropped.length;
      const existingFilesAmount = value.length;
      let acceptedFiles = multiple ? Array.from(dropped) : [dropped[0]];

      // cut excess files
      if (multiple && maxFiles && existingFilesAmount + droppedFilesAmount > maxFiles) {
        const excessFiles = acceptedFiles.slice(-1 * (existingFilesAmount + droppedFilesAmount - maxFiles));
        acceptedFiles = acceptedFiles.slice(0, -1 * excessFiles.length);

        onExceedMaxFiles?.(excessFiles);
      }

      // convert raw files into serialized ones
      const serializedFiles = serializeFiles(acceptedFiles, asBase64);

      // update Formik and component state with serialized files
      const interval = setInterval(() => {
        if (acceptedFiles.length === serializedFiles.length) {
          setUploading(false);
          if (multiple) {
            const currentValue = Array.isArray(value) ? value : [];
            setFieldValue(name, [...currentValue, ...serializedFiles]);
          } else {
            setFieldValue(name, serializedFiles[0]);
          }
          clearInterval(interval);
        }
      }, 70);
    },
    [value, asBase64, maxFiles, multiple, name, onExceedMaxFiles, setFieldValue],
  );

  const handleDrop = React.useCallback(
    (event: React.DragEvent) => {
      const files = event?.dataTransfer?.files;
      if (files?.length) {
        handleChange(files);
      }
    },
    [handleChange],
  );

  const handleClick = React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const handleDelete = React.useCallback(
    (targetIndex: number) => {
      if (Array.isArray(value)) {
        const newFormikValue = value;
        newFormikValue.splice(targetIndex, 1);
        setFieldValue(name, newFormikValue);
      } else {
        setFieldValue(name, null);
      }
    },
    [name, value, setFieldValue],
  );

  const handleDeleteAll = React.useCallback(() => {
    if (Array.isArray(value)) {
      setFieldValue(name, []);
    } else {
      setFieldValue(name, null);
    }
  }, [value, name, setFieldValue]);

  const isTouched = !!touched[name];
  const isValid = isTouched ? !errors[name] : null;
  const isInvalid = isTouched ? !!errors[name] : null;
  const error = isTouched ? errors[name] || null : null;

  return (
    <>
      <input
        ref={inputRef}
        name={name}
        accept={accept}
        multiple={multiple}
        size={maxSize}
        type='file'
        hidden
        onChange={handleChange}
      />
      {render({
        name,
        value,
        error,
        isTouched,
        isValid,
        isInvalid,
        isUploading,
        onClick: handleClick,
        onDrop: handleDrop,
        onDelete: handleDelete,
        onDeleteAll: handleDeleteAll,
        onBlur,
      })}
    </>
  );
};
