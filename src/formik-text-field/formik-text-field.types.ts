import * as React from 'react';
import { FieldInputProps, FormikHandlers } from 'formik/dist/types';

export type FormikTextFieldOutputProps = FieldInputProps<unknown> & {
  name: string;
  value: string;
  error: any | null;
  isTouched: boolean;
  isValid: boolean | null;
  isInvalid: boolean | null;
  onBlur: FormikHandlers['handleBlur'];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type FormikTextFieldProps = {
  name: string;
  render: (props: FormikTextFieldOutputProps) => React.ReactNode;
};
