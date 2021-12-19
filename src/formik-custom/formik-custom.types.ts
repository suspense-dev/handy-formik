import * as React from 'react';
import { FormikHandlers } from 'formik/dist/types';

type FormikCustomOutputProps = {
  name: string;
  value: any;
  error: any | null;
  isTouched: boolean;
  isValid: boolean | null;
  isInvalid: boolean | null;
  onChange: (value: any) => void;
  onBlur: FormikHandlers['handleBlur'];
};

export type FormikCustomProps = {
  name: string;
  render: (props: FormikCustomOutputProps) => React.ReactNode;
};
