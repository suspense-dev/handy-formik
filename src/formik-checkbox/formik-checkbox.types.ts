import React from 'react';
import { FormikHandlers } from 'formik/dist/types';

type FormikCheckboxOutputProps = {
  name: string;
  value: boolean;
  error: any | null;
  isTouched: boolean;
  isValid: boolean | null;
  isInvalid: boolean | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: FormikHandlers['handleBlur'];
};

export type FormikCheckboxProps = {
  name: string;
  render: (props: FormikCheckboxOutputProps) => React.ReactNode;
};
