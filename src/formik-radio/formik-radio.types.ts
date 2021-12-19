import * as React from 'react';
import { FormikHandlers } from 'formik/dist/types';

export type FormikRadioOption = {
  label: React.ReactNode;
  value: any;
};

type FormikRadioOutputProps = {
  name: string;
  value: any;
  error: any | null;
  isTouched: boolean;
  isValid: boolean | null;
  isInvalid: boolean | null;
  checkedOption: FormikRadioOption | null;
  options: FormikRadioOption[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: FormikHandlers['handleBlur'];
};

export type FormikRadioProps = {
  name: string;
  options: FormikRadioOption[];
  render: (props: FormikRadioOutputProps) => React.ReactNode;
};
