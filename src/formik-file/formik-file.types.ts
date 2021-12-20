import React from 'react';
import { FormikHandlers } from 'formik/dist/types';

export type FormikFileCustomFile = {
  name: string;
  size: number;
  src: string;
  raw: File;
  base64?: string;
};

export type FormikFileOutputProps = {
  name: string;
  value: FormikFileCustomFile | FormikFileCustomFile[];
  error: any | null;
  isTouched: boolean;
  isValid: boolean | null;
  isInvalid: boolean | null;
  isUploading: boolean;
  onClick: () => Promise<void> | void;
  onDelete: (targetIndex: number) => void;
  onDeleteAll: () => void;
  onBlur: FormikHandlers['handleBlur'];
  onDrop: (event: React.DragEvent) => void;
};

export type FormikFileProps = {
  name: string;
  maxFiles?: number;
  maxSize?: number;
  multiple?: boolean;
  accept?: string;
  asBase64?: boolean;
  render: (props: FormikFileOutputProps) => React.ReactNode;
  onExceedMaxFiles?: (excessFiles: File[]) => any;
  // depends on "multiple" prop
  onExceedMaxSize?: (invalidFiles: File | File[]) => any;
};
