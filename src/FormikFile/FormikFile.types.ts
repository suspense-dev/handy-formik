import React from "react";

export type FormikFileCustomFile = {
  name: string;
  size: number;
  preview: string;
  src: File | string;
}

export type FormikFileFormat = 'base64';

export type FormikFileProps = {
  name: string;
  maxFiles?: number;
  maxSize?: number;
  multiple?: boolean;
  accept?: string;
  format?: FormikFileFormat;

  render: (props: FormikFileOutputProps) => any;
}

export type FormikFileOutputProps = {
  name: string;
  value: any;
  files: FormikFileCustomFile[];
  touched: boolean;
  error: string | null;
  isValid: boolean | null;
  isInvalid: boolean | null;
  isUploading: boolean;

  onClick: () => void;
  onDelete: (targetIndex: number) => void;
  onBlur: (e: React.SyntheticEvent) => void;
}
