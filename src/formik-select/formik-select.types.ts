import * as React from 'react';
import { FieldInputProps, FormikHandlers } from 'formik/dist/types';

export type FormikSelectOption = {
  label: React.ReactNode;
  value: any;
};

export type FormikSelectSelectedOption = FormikSelectOption | null;

type FormikSelectOutputProps = FieldInputProps<unknown> & {
  name: string;
  value: any;
  error: any | null;
  isTouched: boolean;
  isValid: boolean | null;
  isInvalid: boolean | null;
  selectedOption: FormikSelectSelectedOption;
  options: FormikSelectOption[];

  onChange: (value: any) => void;
  onBlur: FormikHandlers['handleBlur'];
};

export type FormikSelectProps = {
  name: string;
  options: FormikSelectOption[];
  render: (props: FormikSelectOutputProps) => React.ReactNode;
};
